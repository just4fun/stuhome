import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ActionSheetIOS
} from 'react-native';
import Content from './Content';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_Comment';
import { CommentButton } from './button';
import { parseContentWithImage } from '../utils/contentParser';

export default class Comment extends Component {
  _showOptions(userId) {
    let { currentUserId, router } = this.props;
    if (!currentUserId) { return; }

    let options = [
      '回复',
      '取消'
    ];
    let isCurrentUserSelf = currentUserId === userId;
    if (!isCurrentUserSelf) {
      options.splice(1, 0, '私信');
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.props.openReplyModal();
          break;
        case 1:
          if (!isCurrentUserSelf) {
            router.toPmList({ userId });
          }
          break;
      }
    });
  }

  render() {
    let {
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
    } = this.props.comment;

    posts_date = moment(+posts_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => this._showOptions(reply_id)}>
        <View style={styles.commentItem}>
          <View style={styles.row}>
            <Image
             style={styles.avatar}
             source={{ uri: icon }} />
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
            <Content content={reply_content}
                     router={this.props.router} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
