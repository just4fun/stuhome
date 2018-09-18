import React from 'react';
import { View } from 'react-native';
import SubForumItem from '~/components/SubForumItem/SubForumItem';

export default SubForumList = (props) => {
  const { forumList } = props;
  return (
    <View>
      {forumList.map(subForum => {
        return (
          <SubForumItem
            key={subForum.board_id}
            subForum={subForum}
            {...props} />
        );
      })}
    </View>
  );
}
