import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Button from 'apsl-react-native-button';
import moment from 'moment';
import Avatar from '~/components/Avatar/Avatar';

import colors from '~/common/styles/colors.style';
import styles from './NotifyItem.style';

export default class NotifyItem extends Component {
  render() {
    let {
      navigation,
      currentUserId,
      notification: {
        topic_id,
        board_id,
        board_name,
        topic_content,
        reply_content,
        icon,
        user_id,
        reply_nick_name,
        reply_remind_id,
        replied_date
      }
    } = this.props;

    replied_date = moment(+replied_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={colors.underlay}
        onPress={() => navigation.navigate('Topic', {
          topic_id,
          board_id,
          board_name
        })}>
        <View style={styles.item}>
          <View style={styles.authorInfo}>
            <Avatar
              style={styles.avatar}
              url={icon}
              userId={user_id}
              currentUserId={currentUserId}
              userName={reply_nick_name}
              navigation={navigation} />
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
              onPress={() => navigation.navigate('ReplyModal', {
                comment: {
                  // WTF! Why there are different names for common field?!
                  reply_name: reply_nick_name,
                  reply_posts_id: reply_remind_id,
                  board_id,
                  topic_id
                }
              })}>
              回复
            </Button>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
