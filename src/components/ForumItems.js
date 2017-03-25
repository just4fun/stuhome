import React, { Component } from 'react';
import {
  ListView,
  RefreshControl
} from 'react-native';
import ForumItem from '../components/ForumItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
    let { forumList, isTopForumList } = this.props;
    let realForumList = [];
    let isRefreshing = false;

    if (forumList.list) {
      realForumList = forumList.list;
      isRefreshing = forumList.isRefreshing;
    };

    let source = ds.cloneWithRows(realForumList);

    return (
      <ListView
        dataSource={source}
        enableEmptySections={true}
        renderRow={forum => {
          return (
            <ForumItem
              key={forum.board_category_id}
              isTopForumList={isTopForumList}
              forum={forum}
              router={this.props.router} />
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
