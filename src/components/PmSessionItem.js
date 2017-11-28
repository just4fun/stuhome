import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_PmSessionItem';

export default class PmSessionItem extends Component {
  render() {
    let { router, session } = this.props;
    let {
      lastDateline,
      lastSummary,
      toUserId,
      toUserName,
      toUserAvatar,
      isNew
    } = session;

    lastDateline = moment(+lastDateline).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => router.toPmList({
          userId: toUserId
        })}>
        <View style={[styles.item, styles.row]}>
          <Image
           style={styles.avatar}
           source={{ uri: toUserAvatar }} />
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
