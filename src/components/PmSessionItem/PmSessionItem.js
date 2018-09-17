import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import Avatar from '~/components/Avatar/Avatar';

import colors from '~/common/styles/colors.style';
import styles from './PmSessionItem.style';

export default class PmSessionItem extends Component {
  handleOnPress(isNew, plid, userId) {
    if (isNew) {
      // Mark message as read.
      this.props.markPmAsRead({ plid });
    }
    this.props.navigation.navigate('PrivateMessage', { userId });
  }

  render() {
    const {
      navigation,
      currentUserId,
      session: {
        lastDateline,
        lastSummary,
        toUserId,
        toUserName,
        toUserAvatar,
        isNew,
        plid // To indicate current message session.
      }
    } = this.props;
    const date = moment(+lastDateline).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => this.handleOnPress(isNew, plid, toUserId)}>
        <View style={[styles.item, styles.row]}>
          <Avatar
            style={styles.avatar}
            url={toUserAvatar}
            userId={toUserId}
            currentUserId={currentUserId}
            userName={toUserName}
            navigation={navigation} />
          <View style={styles.content}>
            <View style={[styles.author, styles.row]}>
              <View style={styles.row}>
                {!!isNew && <View style={styles.alert}></View>}
                <Text style={[styles.name, !!isNew && styles.bold]}>{toUserName}</Text>
              </View>
              <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.replyContent} numberOfLines={1}>{lastSummary}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
