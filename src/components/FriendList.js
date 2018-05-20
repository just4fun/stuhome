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
import FriendItem from './FriendItem';

export default class FriendList extends Component {
  endReached() {
    let {
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
    let {
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
    let {
      friendList,
      navigation,
      refreshFriendList,
      currentUserId,
      handleSelectFriend
    } = this.props;
    let realFriendList = [];
    let isRefreshing = false;

    if (friendList.list) {
      realFriendList = friendList.list;
      isRefreshing = friendList.isRefreshing;
    };

    return (
      <FlatList
        data={realFriendList}
        keyExtractor={(item, index) => index}
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
