import React, { Component } from 'react';
import { View } from 'react-native';
import SubForumItem from '~/components/SubForumItem/SubForumItem';

export default class SubForumList extends Component {
  render() {
    let { forumList } = this.props;

    return (
      <View>
        {forumList.map(subForum => {
          return (
            <SubForumItem
              key={subForum.board_id}
              subForum={subForum}
              {...this.props} />
          );
        })}
      </View>
    );
  }
}
