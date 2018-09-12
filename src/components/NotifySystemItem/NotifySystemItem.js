import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import moment from 'moment';
import Avatar from '~/components/Avatar/Avatar';
import FONT_SIZES from '~/constants/fontSize';

import styles from '~/components/NotifyItem/NotifyItem.style';

export default class NotifyItem extends Component {
  render() {
    let {
      notification: {
        authorAvatar,
        dateline,
        note
      },
      settings
    } = this.props;

    dateline = moment(+dateline).startOf('minute').fromNow();
    let { fontSize, lineHeight } = FONT_SIZES[settings.fontSize];
    let fontStyle = {
      fontSize,
      lineHeight
    };

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
          <Text style={[styles.replyContent, fontStyle]}>{note}</Text>
        </View>
      </View>
    );
  }
}
