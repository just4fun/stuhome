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
import MessageBar from '../services/MessageBar';
import SafariView from '../services/SafariView';

export default class Comment extends Component {
  showOptions() {
    let {
      currentUserId,
      navigation,
      topicId,
      boardId,
      comment,
      comment: {
        reply_id: userId,
        reply_content,
        managePanel
      }
    } = this.props;

    let options = [
      '回复',
      '复制'
    ];
    let isLoginUser = currentUserId === userId;
    if (!isLoginUser) {
      options.push('私信');
    } else {
      options.push('编辑');
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
            // `comment` here is item from `forum/postlist`, which has
            // no `topicId` and `boardId`, but necessary for topic reply
            // API.
            comment: Object.assign({}, comment, {
              topic_id: topicId,
              board_id: boardId
            }),
            // To indicate we need to fetch topic again
            // to display new comments.
            isReplyInTopic: true
          });
          break;
        case 1:
          Clipboard.setString(this.props.getCopyContent(reply_content));
          MessageBar.show({
            message: '复制内容成功',
            type: 'success'
          });
          break;
        case 2:
          if (!isLoginUser) {
            navigation.navigate('PrivateMessage', { userId });
          } else if (managePanel && managePanel.length > 0) {
            let editAction = managePanel.find(item => item.title === '编辑');
            if (editAction) {
              SafariView.show(editAction.action);
            }
          }
          break;
      }
    });
  }

  handlePress() {
    if (!this.props.currentUserId) { return; }
    this.showOptions();
  }

  render() {
    let {
      navigation,
      currentUserId,
      topicId,
      boardId,
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
              currentUserId={currentUserId}
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
              navigation={navigation} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
