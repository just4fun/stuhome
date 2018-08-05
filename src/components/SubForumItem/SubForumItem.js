import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import FORUMS from '~/constants/forums';

import colors from '~/common/styles/colors.style';
import styles from './SubForumItem.style';

export default class SubForumItem extends Component {
  render() {
    let {
      navigation,
      isForumListModal,
      subForum,
      subForum: {
        board_id,
        board_name,
        td_posts_num,
        posts_total_num,
        topic_total_num,
        last_posts_date
      }
    } = this.props;

    let boardImage = FORUMS[board_id] || require('~/images/board_img/default.png');
    last_posts_date = moment(+last_posts_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        key={board_id}
        underlayColor={colors.underlay}
        onPress={() => {
          if (isForumListModal) {
            this.props.handleSelectForum(subForum);
          } else {
            navigation.navigate('Forum', subForum);
          }
        }}>
        <View style={styles.subForum}>
          <View style={styles.left}>
            <Image
              style={styles.icon}
              source={boardImage} />
          </View>
          <View style={styles.right}>
            <View style={styles.leftInfo}>
              <Text style={styles.text}>{board_name}</Text>
              <Text style={[styles.number, styles.subForumLastPostDate]}>{last_posts_date}</Text>
            </View>
            <View style={styles.rightInfo}>
              <View style={styles.row}>
                <Text style={styles.numberText}>主题：</Text>
                <Text style={[styles.number, styles.postsNumber]}>{topic_total_num}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.numberText}>贴子：</Text>
                <Text style={[styles.number, styles.postsNumber]}>{posts_total_num}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.numberText}>今日：</Text>
                <Text style={[styles.number, styles.todayNumber]}>{td_posts_num}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
