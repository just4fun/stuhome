import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import FriendItem from '~/components/FriendItem/FriendItem';

import listStyles from '~/common/styles/List.style';
import indicatorStyles from '~/common/styles/Indicator.style';

export default class FriendList extends Component {
  endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.friendList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this.props.refreshFriendList({
      page: page + 1,
      isEndReached: true
    });
  }

  renderFooter() {
    const {
      hasMore,
      isEndReached
    } = this.props.friendList;

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
          暂无好友
        </Text>
      </View>
    );
  }

  render() {
    const {
      friendList,
      navigation,
      refreshFriendList,
      currentUserId,
      handleSelectFriend
    } = this.props;
    let isRefreshing = false;
    let realFriendList = [];

    if (friendList.list) {
      realFriendList = friendList.list;
      isRefreshing = friendList.isRefreshing;
    };

    return (
      <FlatList
        data={realFriendList}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: friend }) => {
          return (
            <FriendItem
              key={friend.uid}
              friend={friend}
              navigation={navigation}
              currentUserId={currentUserId}
              handleSelectFriend={handleSelectFriend} />
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => this.renderFooter()}
        ListEmptyComponent={() => !isRefreshing && this.renderListEmptyComponent()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => refreshFriendList({ page: 1 })}
            refreshing={isRefreshing} />
        } />
    );
  }
}
