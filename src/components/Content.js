import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import ProgressImage from './ProgressImage';
import styles from '../styles/components/_Content';
import colors from '../styles/common/_colors';
import { parseContentWithImage } from '../utils/contentParser';

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

  // $typeMaps = array('text' => 0, 'image' => 1, 'video' => 2, 'audio' => 3, 'url' => 4, 'attachment' => 5,);
  // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/forum/PostListAction.php#L539
  render() {
    let newContent = this.getContentByGroup();

    return (
      <View style={styles.container}>
        {newContent.map((groupContent, groupIndex) => {
          // just check first item in each array to identify what is the
          // type of the array group.
          switch (groupContent[0].type) {
            // text and url
            case 0:
            case 4:
              return (
                <Text key={groupIndex}
                      style={[styles.item, styles.text]}>
                  {groupContent.map((item, index) => {
                    return (
                      item.type === 0 &&
                        <Text key={index}>{parseContentWithImage(item.infor)}</Text>
                      ||
                        <Text key={index}
                              style={styles.url}
                              onPress={() => this.props.router.toBrowser(item.url)}>
                          {
                            // if the link content is `@somebody`, `infor` is
                            // the text, while `url` is the link to his/her
                            // personal page.
                          }
                          {item.url !== item.infor
                            &&
                            item.infor
                            ||
                            item.url
                          }
                        </Text>
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
                        // display thumb image to client
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
