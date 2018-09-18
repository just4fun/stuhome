import React from 'react';
import {
  View,
  Text
} from 'react-native';
import SubForumList from '~/components/SubForumList/SubForumList';

import styles from './ForumItem.style';

export default ForumItem = (props) => {
  const {
    isTopForumList,
    forum: {
      board_category_name,
      board_list
    }
  } = props;

  return (
    <View style={styles.container}>
      {isTopForumList &&
        <View style={styles.forumHeader}>
          <Text style={styles.forumTitle}>{board_category_name}</Text>
        </View>
      }
      <SubForumList
        {...props}
        forumList={board_list} />
    </View>
  );
}
