import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Avatar from './Avatar';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_PmSessionItem';

export default class PmSessionItem extends Component {
  _handleOnPress(isNew, plid, userId) {
    if (isNew) {
      // Mark message as read.
      this.props.markAsRead({ plid });
    }
    this.props.navigation.navigate('PrivateMessage', { userId });
  }

  render() {
    let {
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

    lastDateline = moment(+lastDateline).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => this._handleOnPress(isNew, plid, toUserId)}>
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
              <Text style={styles.date}>{lastDateline}</Text>
            </View>
            <Text style={styles.replyContent} numberOfLines={1}>{lastSummary}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
