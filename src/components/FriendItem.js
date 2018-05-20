import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import Avatar from './Avatar';
import { AVATAR_ROOT } from '../config';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_FriendItem';

export default class FriendItem extends Component {
  render() {
    let {
      navigation,
      currentUserId,
      friend,
      friend: {
        name,
        uid
      }
    } = this.props;
    let avatar = `${AVATAR_ROOT}&uid=${uid}`;

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => this.props.handleSelectFriend(friend)}>
        <View style={[styles.item, styles.row]}>
          <Avatar
            style={styles.avatar}
            url={avatar}
            userId={uid}
            currentUserId={currentUserId}
            userName={name}
            navigation={navigation} />
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
