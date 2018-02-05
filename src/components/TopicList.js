import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import listStyles from '../styles/common/_List';
import indicatorStyles from '../styles/common/_Indicator';
import TopicItem from './TopicItem';

export default class TopicList extends Component {
  endReached() {
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

  renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.topicList;

    if (!hasMore || !isEndReached) { return <View></View>; }

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

  isBadData(topic) {
    if (!topic) { return true; }

    if (topic.board_id === 0 || topic.user_id === 0) { return true; }

    return false;
  }

  renderListEmptyComponent() {
    return (
      <View style={listStyles.emptyView}>
        <Text style={listStyles.emptyText}>
          {this.props.emptyText || '暂无帖子'}
        </Text>
      </View>
    );
  }

  render() {
    let {
      topicList,
      isSearch,
      accessTopicListFromForumItem,
      currentUserId,
      navigation
    } = this.props;
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

    return (
      <FlatList
        ref={component => this.topicList = component}
        data={realTopicList}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: topic }) => {
          // https://github.com/just4fun/stuhome/issues/15
          if (this.isBadData(topic)) { return null; }

          return (
            <TopicItem
              key={this.getTopicId(topic)}
              currentUserId={currentUserId}
              accessTopicListFromForumItem={accessTopicListFromForumItem}
              topic={topic}
              navigation={navigation} />
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => this.renderFooter()}
        ListEmptyComponent={() => !isRefreshing && this.renderListEmptyComponent()}
        refreshControl={refreshControl} />
    );
  }
}
