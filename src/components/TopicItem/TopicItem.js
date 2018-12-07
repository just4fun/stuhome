import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// Refer to this issue https://github.com/moment/momentjs.com/pull/241
import 'moment/locale/zh-cn';
import Avatar from '~/components/Avatar/Avatar';
import FONT_SIZES from '~/constants/fontSize';
import { AVATAR_ROOT } from '~/config/app';

import colors from '~/common/styles/colors.style';
import styles from './TopicItem.style';

export default class TopicItem extends Component {
  handleOnPress(topic) {
    const {
      currentUserId,
      navigation
    } = this.props;
    // Login User
    if (currentUserId) {
      navigation.push('Topic', topic);
    } else {
      navigation.push('LoginModal');
    }
  }

  render() {
    const {
      navigation,
      settings,
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
    const lastReplyDate = moment(+last_reply_date).startOf('minute').fromNow();
    const { fontSize, lineHeight } = FONT_SIZES[settings.fontSize];
    const fontStyle = {
      fontSize,
      lineHeight
    };

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
                  // For `Search` page, there is no avatar available in API response,
                  // so we need to set it manually.
                  url={userAvatar || `${AVATAR_ROOT}&uid=${user_id}`}
                  userId={user_id}
                  userName={user_nick_name}
                  currentUserId={currentUserId}
                  navigation={navigation} />
              </View>
              <View style={styles.right}>
                <View style={styles.leftInfo}>
                  <Text style={styles.name}>{user_nick_name}</Text>
                  <Text style={styles.date}>{lastReplyDate}</Text>
                </View>
                <View style={styles.rightInfo}>
                  {(!accessTopicListFromForumItem && !!board_name) &&
                    <View style={styles.metrics}>
                      <View style={styles.forumBorder}>
                        <Text style={[styles.forumName]}>
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
              <Text style={[styles.title, fontStyle]}>{title}</Text>
              {!!subject && <Text style={[styles.subject, fontStyle]}>{subject}</Text>}
              {!!summary && <Text style={[styles.subject, fontStyle]}>{summary}</Text>}
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
