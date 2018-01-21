import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ActionSheetIOS,
  Clipboard
} from 'react-native';
import Content from './Content';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from './Avatar';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_Comment';
import { CommentButton } from './button';
import { parseContentWithImage } from '../utils/contentParser';
import MessageBar from '../services/MessageBar';

export default class Comment extends Component {
  showOptions() {
    let {
      currentUserId,
      navigation,
      comment,
      comment: {
        reply_id: userId
      }
    } = this.props;

    let options = ['回复'];
    let isCurrentUserSelf = currentUserId === userId;
    if (!isCurrentUserSelf) {
      options.push('私信');
    }
    options.push('取消');

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          navigation.navigate('ReplyModal', {
            comment,
            // To indicate we need to fetch topic again
            // to display new comments.
            isReplyInTopic: true
          });
          break;
        case 1:
          Clipboard.setString(this.props.getCopyContent());
          MessageBar.show({
            message: '复制内容成功',
            type: 'success'
          });
          break;
        case 2:
          if (!isCurrentUserSelf) {
            navigation.navigate('PrivateMessage', { userId });
          }
          break;
      }
    });
  }

  handlePress() {
    if (!this.props.currentTopicId) { return; }
    this.showOptions();
  }

  render() {
    let {
      navigation,
      currentTopicId,
      comment: {
        reply_name,
        userTitle,
        icon,
        position,
        reply_id, // user id
        reply_content,
        posts_date,
        is_quote,
        quote_content,
        mobileSign
      }
    } = this.props;

    posts_date = moment(+posts_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => this.handlePress()}>
        <View style={styles.commentItem}>
          <View style={styles.row}>
            <Avatar
              style={styles.avatar}
              url={icon}
              userId={reply_id}
              userName={reply_name}
              navigation={navigation} />
            <View style={styles.author}>
              <View style={styles.row}>
                <Text style={styles.name}>{reply_name}</Text>
                <Text style={styles.level}>{userTitle}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.date}>{posts_date}</Text>
                {!!mobileSign &&
                  <View style={[styles.row, styles.mobileWrapper]}>
                    <Icon style={styles.mobileIcon} name='mobile' />
                    <Text style={styles.mobileText}>{mobileSign}</Text>
                  </View>
                }
              </View>
            </View>
            <View>
              <Text style={styles.floor}>#{position - 1}</Text>
            </View>
          </View>
          <View style={styles.comment}>
            {!!is_quote &&
              <View style={styles.quote}>
                <Text style={styles.quoteContent}>{quote_content}</Text>
              </View>
            }
            <Content
              content={reply_content}
              currentTopicId={currentTopicId}
              navigation={navigation} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
