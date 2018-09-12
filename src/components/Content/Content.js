import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import ProgressImage from '~/components/ProgressImage/ProgressImage';
import SafariView from '~/services/SafariView';
import FONT_SIZES from '~/constants/fontSize';
import { parseContentWithEmoji } from '~/utils/contentParser';
import { DOMAIN_ROOT } from '~/config';

import styles from './Content.style';

export default class Content extends Component {
  isSameContentType(previous, current) {
    // same type
    if (previous.type === current.type) { return true; }

    // 0 (text) and 4 (url) are same type
    if ((previous.type === 0 || previous.type === 4) && (current.type === 0 || current.type === 4)) { return true; }

    return false;
  }

  getContentByGroup() {
    let { content } = this.props;
    let newContent = [];
    let groupIndex = 0;

    content.forEach((item, index) => {
      if (!newContent[groupIndex]) {
        newContent[groupIndex] = [];
      }

      let previousItem = content[index - 1];
      let currentItem = content[index];

      if (!previousItem || this.isSameContentType(previousItem, currentItem)) {
        newContent[groupIndex].push(currentItem);
      } else {
        newContent[++groupIndex] = [currentItem];
      }
    });

    return newContent;
  }

  getUserId(url) {
    if (!url) { return null; }
    let matchArray = /https?:\/\/.+uid=(\d+)/.exec(url);
    return matchArray[1];
  }

  getUserName(content) {
    if (!content) { return null; }
    return content.slice(1);
  }

  // http://bbs.uestc.edu.cn/home.php?mod=space&uid=32044
  isAtSomebody(url) {
    if (!url) { return false; }

    // If the url content is `@somebody`, `infor` will be the text,
    // while `url` is the link to his/her personal page. but sometimes
    // there is exception, we need to check whether the url contains `uid`,
    // instead of checking `item.url !== item.infor` here.
    return !!(/https?:\/\/.+uid=(\d+)/.exec(url));
  }

  // http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1554255
  isTopicLink(url) {
    if (!url) { return false; }
    return !!(/https?:\/\/.+tid=(\d+)/.exec(url));
  }

  getTopicId(url) {
    if (!url) { return null; }
    let matchArray = /https?:\/\/.+tid=(\d+)/.exec(url);
    return matchArray[1];
  }

  // We could use nested views(to wrap image) inside <Text>, to resolve that url content will be newline,
  // however, acoording to https://facebook.github.io/react-native/docs/text.html, elements inside of a
  // <Text> are no longer rectangles, which means we could not use something like margin or padding to
  // adjust layout.
  //
  // Here we classify different kinds of content into group, for example, if the content is
  //
  // 0: text
  // 1: url
  // 2: text
  // 3: image
  // 4: image
  // 5: url
  // 6: text
  // 7: text
  // 8: image
  //
  // the new content will be
  //
  // <View>
  //   <Text> 0(text) + 1(url) + 2(text) </Text>
  //   <View> 3(image) + 4(image) <View>
  //   <Text> 5(url) + 6(text) + 7(text) </Text>
  //   <View 8(image) </View>
  // </View>
  //
  // To wrap both text content and url content into <Text>, the url content will wrap when they
  // see the end of the line.
  // To classify <Text> and <Image> into different wrappers, we could use margin or padding to
  // adjust layout.
  render() {
    let newContent = this.getContentByGroup();
    let { navigation, settings } = this.props;
    let { fontSize, lineHeight } = FONT_SIZES[settings.fontSize];
    let fontStyle = {
      fontSize,
      lineHeight
    };

    return (
      <View style={styles.container}>
        {newContent.map((groupContent, groupIndex) => {
          // Just check first item in each array to identify what is the
          // type of the content group.
          switch (groupContent[0].type) {
            // $typeMaps = array('text' => 0, 'image' => 1, 'video' => 2, 'audio' => 3, 'url' => 4, 'attachment' => 5,);
            // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/forum/PostListAction.php#L539
            //
            // text and url
            case 0:
            case 4:
              return (
                <Text key={groupIndex}
                      style={[styles.item, styles.text, fontStyle]}>
                  {groupContent.map((item, index) => {
                    return (
                      item.type === 0 && (
                        <Text key={index}>{parseContentWithEmoji(item.infor)}</Text>
                      ) || (
                        this.isAtSomebody(item.url) && (
                          // @somebody
                          <Text key={index}
                                style={styles.url}
                                onPress={() => navigation.navigate('Individual', {
                                  userId: this.getUserId(item.url),
                                  userName: this.getUserName(item.infor)
                                })}>
                            {item.infor}
                          </Text>
                        ) || (
                          // link
                          //  1. topic
                          //  2. common url
                          this.isTopicLink(item.url) && (
                            <Text key={index}
                                  style={styles.url}
                                  onPress={() => navigation.navigate('Topic', {
                                    topic_id: this.getTopicId(item.url)
                                  })}>
                              {item.infor}
                            </Text>
                          ) || (
                            <Text key={index}
                                  style={styles.url}
                                  onPress={() => SafariView.show(item.url)}>
                              {item.infor}
                            </Text>
                          )
                        )
                      )
                    );
                  })}
                </Text>
              );
            // image
            case 1:
              return (
                <View key={groupIndex}
                      style={[styles.item, styles.imageWrapper]}>
                  {groupContent.map((item, index) => {
                    return (
                      <ProgressImage
                        key={index}
                        style={styles.image}
                        // Display thumb image to client.
                        // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/forum/PostListAction.php#L548
                        thumbUri={item.infor}
                        originalUri={item.originalInfo} />
                    );
                  })}
                </View>
              );
          }
        })}
      </View>
    );
  }
}
