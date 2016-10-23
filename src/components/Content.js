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
      <View>
        {content.map((content, index) => {
          switch (content.type) {
            // text
            case 0:
            default:
              return <Text key={index}
                           style={styles.contentItem}>
                       {parseContentWithImage(content.infor)}
                     </Text>;
            // pic
            case 1:
              return <ProgressImage key={index}
                                    style={styles.contentItem}
                                    uri={content.originalInfo} />;
            // link
            case 4:
              return (
                <TouchableHighlight
                  key={index}
                  style={styles.contentItem}
                  underlayColor={colors.underlay}
                  onPress={() => this.props.router.toBrowser(content.url)}>
                  <Text style={styles.url}>
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
                </TouchableHighlight>
              );
          }
        })}
      </View>
    );
  }
}
