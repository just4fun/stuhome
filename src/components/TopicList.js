import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import TopicItem from './TopicItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class TopicList extends Component {
  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    /**
    * `onEndReached` will be triggered when we want to access a forum
    * without logging in, that will leads the error alter appears two
    * times, so check whether there are topics already to avoid this issue.
    */
    // if (!list[this.props.boardId].topicList.length) { return; }

    this.props.refreshTopicList(page + 1, true);
  }

  _renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.topicList;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    let { topicList, boardId, isSearch } = this.props;
    let realTopicList = null;
    let refreshControl = null;

    if (!isSearch) {
      if (!topicList.list[boardId]) {
        topicList.list[boardId] = {
          typeList: [],
          topicList: []
        };
      }

      realTopicList = topicList.list[boardId].topicList;
      refreshControl = <RefreshControl
                         title='正在加载...'
                         onRefresh={() => this.props.refreshTopicList()}
                         refreshing={topicList.isRefreshing} />;
    } else {
      realTopicList = topicList.list;
    }

    let source = ds.cloneWithRows(realTopicList);

    return (
      <ListView
        dataSource={source}
        enableEmptySections={true}
        renderRow={topic => {
          return (
            <TopicItem
              key={topic.topic_id}
              topic={topic}
              router={this.props.router} />
          );
        }}
        onEndReached={() => this._endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this._renderFooter()}
        refreshControl={refreshControl} />
    );
  }
}
