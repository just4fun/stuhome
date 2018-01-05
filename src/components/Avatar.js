import React, { Component } from 'react';
import {
  View,
  TouchableHighlight
} from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import styles from '../styles/components/_Avatar';
import colors from '../styles/common/_colors';

export default class Avatar extends Component {
  render() {
    let {
      style,
      url,
      onPress,
      navigation,
      userId,
      userName,
      currentUserId
    } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          navigation.navigate('Individual', {
            userId,
            userName,
            currentUserId
          });
        }}>
        <View>
          <CachedImage
            style={[styles.avatar, style]}
            source={{ uri: url }} />
        </View>
      </TouchableHighlight>
    );
  }
}
