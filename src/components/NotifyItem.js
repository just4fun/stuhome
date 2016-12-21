import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Button from 'apsl-react-native-button';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_NotifyItem';

export default class NotifyItem extends Component {
  render() {
    let { router, notification } = this.props;
    let {
      topic_id,
      board_id,
      board_name,
      topic_subject,
      topic_content,
      reply_content,
      icon,
      reply_nick_name,
      reply_remind_id,
      replied_date
    } = notification;

    replied_date = moment(+replied_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => router.toTopic({
          topic_id,
          board_id,
          board_name
        })}>
        <View style={styles.item}>
          <View style={styles.authorInfo}>
            <Image
             style={styles.avatar}
             source={{ uri: icon }} />
            <View style={styles.author}>
              <Text style={styles.name}>{reply_nick_name}</Text>
              <Text style={styles.date}>{replied_date}</Text>
            </View>
          </View>
          <Text style={styles.replyContent}>{reply_content}</Text>
          <View style={styles.quote}>
            <Text style={styles.topicContent}>{topic_content}</Text>
          </View>
          <View style={styles.reply}>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => this.props.openReplyModal({
                // WTF! Why there is different name for common field?!
                reply_name: reply_nick_name,
                reply_posts_id: reply_remind_id,
                board_id,
                topic_id
              })}>
              回复
            </Button>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
