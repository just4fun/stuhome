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
  scrollToTop() {
    this.topicList.scrollTo({ x: 0 });
  }

  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this.props.refreshTopicList({
      page: page + 1,
      isEndReached: true
    });
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

  getTopicId(topic) {
    // for `hot(今日热门)` tab in Home page, each topic has
    // not `topic_id` field, but they have `source_id` and
    // `source_type` instead.
    if (topic.source_id) { return topic.source_id; }

    return topic.topic_id;
  }

  render() {
    let { topicList, isSearch } = this.props;
    let realTopicList = [];
    let isRefreshing = false;
    let refreshControl = null;

    if (topicList.list) {
      realTopicList = topicList.list;
      isRefreshing = topicList.isRefreshing;
    };

    if (!isSearch) {
      refreshControl = <RefreshControl
                         title='正在加载...'
                         onRefresh={() => this.props.refreshTopicList({
                           page: 1,
                           isEndReached: false
                         })}
                         refreshing={isRefreshing} />;
    }

    let source = ds.cloneWithRows(realTopicList);

    return (
      <ListView
        ref={component => this.topicList = component}
        dataSource={source}
        enableEmptySections={true}
        renderRow={topic => {
          return (
            <TopicItem
              key={this.getTopicId(topic)}
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
