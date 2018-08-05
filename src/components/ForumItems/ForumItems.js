import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl
} from 'react-native';
import ForumItem from '~/components/ForumItem/ForumItem';

export default class ForumItems extends Component {
  componentDidMount() {
    let { shouldFetchDataInside, boardId } = this.props;

    // In `ForumDetail` page, we want current component will
    // fetch data only when second tab selected, so we need to
    // fetch data inside this component instead of passing data
    // down from its parent `ForumDetail`.
    if (shouldFetchDataInside) {
      this.props.fetchForumList(this.boardId);
    }
  }

  render() {
    let { forumList } = this.props;
    let realForumList = [];
    let isRefreshing = false;

    if (forumList.list) {
      realForumList = forumList.list;
      isRefreshing = forumList.isRefreshing;
    };

    return (
      <FlatList
        data={realForumList}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: forum }) => {
          return (
            <ForumItem
              key={forum.board_category_id}
              forum={forum}
              {...this.props} />
          );
        }}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => this.props.refreshForumList()}
            refreshing={isRefreshing} />
        } />
    );
  }
}
