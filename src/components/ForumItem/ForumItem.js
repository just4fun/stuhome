import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import SubForumList from '~/components/SubForumList/SubForumList';

import styles from './ForumItem.style';

export default class ForumItem extends Component {
  render() {
    let {
      isTopForumList,
      forum: {
        board_category_name,
        board_list
      }
    } = this.props;

    return (
      <View style={styles.container}>
        {isTopForumList &&
          <View style={styles.forumHeader}>
            <Text style={styles.forumTitle}>{board_category_name}</Text>
          </View>
        }
        <SubForumList
          {...this.props}
          forumList={board_list} />
      </View>
    );
  }
}
