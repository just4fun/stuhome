import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import NotifyItem from '~/components/NotifyItem/NotifyItem';
import NotifySystemItem from '~/components/NotifySystemItem/NotifySystemItem';

import listStyles from '~/common/styles/List.style';
import indicatorStyles from '~/common/styles/Indicator.style';

export default class NotifyList extends Component {
  componentDidMount() {
    this.props.fetchNotifyList();
  }

  endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.notifyList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this.props.refreshNotifyList({
      page: page + 1,
      isEndReached: true
    });
  }

  renderFooter() {
    const {
      hasMore,
      isEndReached
    } = this.props.notifyList;

    if (!hasMore || !isEndReached) { return <View></View>; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  renderListEmptyComponent() {
    return (
      <View style={listStyles.emptyView}>
        <Text style={listStyles.emptyText}>
          暂无消息
        </Text>
      </View>
    );
  }

  render() {
    const {
      notifyList,
      navigation,
      currentUserId,
      refreshNotifyList,
      settings
    } = this.props;
    let isRefreshing = false;
    let realNotifyList = [];

    if (notifyList.list) {
      realNotifyList = notifyList.list;
      isRefreshing = notifyList.isRefreshing;
    };

    return (
      <FlatList
        data={realNotifyList}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: notification, index }) => {
          if (notification.type === 'system') {
            return (
              <NotifySystemItem
                key={index}
                settings={settings}
                notification={notification} />
            );
          }

          return (
            <NotifyItem
              key={notification.topic_id}
              notification={notification}
              currentUserId={currentUserId}
              settings={settings}
              navigation={navigation} />
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => this.renderFooter()}
        ListEmptyComponent={() => !isRefreshing && this.renderListEmptyComponent()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => refreshNotifyList({})}
            refreshing={isRefreshing} />
        } />
    );
  }
}
