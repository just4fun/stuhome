import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import ProgressImage from './ProgressImage';
import styles from '../styles/components/_Content';
import { parseContentWithImage } from '../utils/app';

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
          }
        })}
      </View>
    );
  }
}
