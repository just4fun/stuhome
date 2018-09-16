import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import Avatar from '~/components/Avatar/Avatar';
import { AVATAR_ROOT } from '~/config/app';

import colors from '~/common/styles/colors.style';
import styles from './FriendItem.style';

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
