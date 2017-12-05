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
  render() {
    let { content } = this.props;

    return (
      // Nested Text and Views
      // https://facebook.github.io/react-native/docs/text.html
      //
      // Use <Text> here instead of <View> is to resolve that case 4
      // will be isolated line which will lead bad UI experience.
      <Text style={styles.container}>
        {content.map((content, index) => {
          // $typeMaps = array('text' => 0, 'image' => 1, 'video' => 2, 'audio' => 3, 'url' => 4, 'attachment' => 5,);
          // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/forum/PostListAction.php#L539
          switch (content.type) {
            // text
            case 0:
              return <Text key={index}>{parseContentWithImage(content.infor)}</Text>;
            // image
            case 1:
              return (
                <View style={styles.image}>
                  <ProgressImage
                    key={index}
                    // display thumb image to client
                    // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/forum/PostListAction.php#L548
                    thumbUri={content.infor}
                    originalUri={content.originalInfo} />
                </View>
              );
            // url
            case 4:
              return (
                // <TouchableHighlight
                //   key={index}
                //   underlayColor={colors.underlay}
                //   onPress={() => this.props.router.toBrowser(content.url)}>
                  <Text key={index}
                        style={styles.url}
                        onPress={() => this.props.router.toBrowser(content.url)}>
                    {
                      // if the link content is `@somebody`, `infor` is
                      // the text, while `url` is the link to his/her
                      // personal page.
                    }
                    {content.url !== content.infor
                      &&
                      content.infor
                      ||
                      content.url
                    }
                  </Text>
                // </TouchableHighlight>
              );
          }
        })}
      </Text>
    );
  }
}
