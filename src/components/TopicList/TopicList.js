import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import TopicItem from '~/components/TopicItem/TopicItem';
import { AVATAR_ROOT } from '~/config/app';

import listStyles from '~/common/styles/List.style';
import indicatorStyles from '~/common/styles/Indicator.style';

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
    const {
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

    // In '密语', all the anonymous topics have `user_id: 0` while
    // non-zero `board_id`, it's not bad data.
    return topic.board_id === 0 && topic.user_id === 0;
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
    const {
      topicList,
      isSearch,
      accessTopicListFromForumItem,
      currentUserId,
      navigation,
      settings
    } = this.props;
    let realTopicList = [];
    let isRefreshing = false;
    let refreshControl = null;

    if (topicList.list) {
      realTopicList = topicList.list;
      isRefreshing = topicList.isRefreshing;
    };

    if (!isSearch) {
      refreshControl = (
        <RefreshControl
          title='正在加载...'
          onRefresh={() => this.props.refreshTopicList({
            page: 1,
            isEndReached: false
          })}
          refreshing={isRefreshing} />
      )
    }

    return (
      <FlatList
        ref={component => this.topicList = component}
        data={realTopicList}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: topic }) => {
          // https://github.com/just4fun/stuhome/issues/15
          if (this.isBadData(topic)) { return null; }

          // There is totally a bug for server side.
          //
          // If I replied a anonymous topic, then go to my replied topic list,
          // both avatar and userId of the author of that anonymous topic will
          // be exposed in API.
          //
          // This is workaround to make the author anonymous in replied topic list.
          if (topic.user_nick_name === '') {
            topic.user_nick_name = '匿名';
            topic.user_id = 0;
            topic.userAvatar = `${AVATAR_ROOT}&uid=0`;
          }

          return (
            <TopicItem
              key={this.getTopicId(topic)}
              currentUserId={currentUserId}
              settings={settings}
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
