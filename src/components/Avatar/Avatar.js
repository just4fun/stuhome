import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './Avatar.style';

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
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress();
            return;
          }

          // Cases for avatar could not be clicked to redirect.
          // 1. No login user
          // 2. Anonymous user
          // 3. Same user (in individual page)
          if (!currentUserId || !userId || userId.toString() === currentUserId.toString()) { return; }

          navigation.navigate('Individual', {
            userId,
            userName,
            currentUserId
          });
        }}>
        <Image
          style={[styles.avatar, style]}
          source={{ uri: url }} />
      </TouchableOpacity>
    );
  }
}
