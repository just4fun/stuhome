import React, { Component } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import NotifyItem from './NotifyItem';

export default class NotifyList extends Component {
  componentDidMount() {
    this.props.fetchNotifyList();
  }

  endReached() {
    let {
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
    let {
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

  render() {
    let {
      notifyList,
      navigation,
      currentUserId
    } = this.props;
    let realNotifyList = [];
    let isRefreshing = false;

    if (notifyList.list) {
      realNotifyList = notifyList.list;
      isRefreshing = notifyList.isRefreshing;
    };

    return (
      <FlatList
        data={realNotifyList}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: notification }) => {
          return (
            <NotifyItem
              key={notification.topic_id}
              notification={notification}
              currentUserId={currentUserId}
              navigation={navigation} />
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => this.renderFooter()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => this.props.refreshNotifyList({})}
            refreshing={isRefreshing} />
        } />
    );
  }
}
