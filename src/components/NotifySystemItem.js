import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Avatar from './Avatar';
import moment from 'moment';
import styles from '../styles/components/_NotifyItem';

export default class NotifyItem extends Component {
  render() {
    let {
      notification: {
        authorAvatar,
        dateline,
        note
      }
    } = this.props;

    dateline = moment(+dateline).startOf('minute').fromNow();

    return (
      <View
        style={styles.container}>
        <View style={styles.item}>
          <View style={styles.authorInfo}>
            <Avatar
              style={styles.avatar}
              url={authorAvatar} />
            <View style={styles.author}>
              <Text style={styles.name}>{'系统'}</Text>
              <Text style={styles.date}>{dateline}</Text>
            </View>
          </View>
          <Text style={styles.replyContent}>{note}</Text>
        </View>
      </View>
    );
  }
}
