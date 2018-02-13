import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// Refer to this issue https://github.com/moment/momentjs.com/pull/241
import 'moment/locale/zh-cn';
import { AVATAR_ROOT } from '../config';
import styles from '../styles/components/_TopicItem';
import colors from '../styles/common/_colors';

export default class TopicItem extends Component {
  handleOnPress(topic) {
    let {
      currentUserId,
      navigation
    } = this.props;
    // Login User
    if (currentUserId) {
      // Topic title will be treated as screen header title before we
      // `setParams` with `boardName` in `componentDidMount` hook.
      // So we should use another name for topic title for navigation.
      navigation.navigate('Topic', Object.assign({}, topic, {
        title: null,
        topic_title: topic.title
      }));
    } else {
      navigation.navigate('LoginModal');
    }
  }

  render() {
    let {
      navigation,
      accessTopicListFromForumItem,
      currentUserId,
      topic,
      topic: {
        title,
        subject,
        summary,
        hits,
        replies,
        board_id,
        board_name,
        user_nick_name,
        last_reply_date,
        user_id,
        userAvatar
      }
    } = this.props;

    // `last_reply_date` is timestamp in string from API
    last_reply_date = moment(+last_reply_date).startOf('minute').fromNow();
    // for `Search`, there is no avatar available in API response, so we need to
    // set it manually.
    userAvatar = userAvatar || `${AVATAR_ROOT}&uid=${user_id}`;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor={colors.underlay}
          onPress={() => this.handleOnPress(topic)}>
          <View style={styles.item}>
            <View style={styles.row}>
              <View style={styles.left}>
                <Avatar
                  style={styles.avatar}
                  url={userAvatar}
                  userId={user_id}
                  userName={user_nick_name}
                  currentUserId={currentUserId}
                  navigation={navigation} />
              </View>
              <View style={styles.right}>
                <View style={styles.leftInfo}>
                  <Text style={styles.name}>{user_nick_name}</Text>
                  <Text style={styles.date}>{last_reply_date}</Text>
                </View>
                <View style={styles.rightInfo}>
                  {(!accessTopicListFromForumItem && !!board_name) &&
                    <View style={styles.metrics}>
                      <View style={styles.forumBorder}>
                        <Text style={styles.forumName}>
                          {board_name}
                        </Text>
                      </View>
                    </View>
                  }
                  <View style={styles.metrics}>
                    <Icon
                      style={styles.viewsInfo}
                      name='eye'>
                      {hits}
                    </Icon>
                    <Icon
                      style={styles.commentsInfo}
                      name='commenting'>
                      {replies}
                    </Icon>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              {!!subject && <Text style={styles.subject}>{subject}</Text>}
              {!!summary && <Text style={styles.subject}>{summary}</Text>}
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
