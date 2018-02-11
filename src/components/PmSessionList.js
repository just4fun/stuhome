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
import PmSessionItem from './PmSessionItem';

export default class PrivateList extends Component {
  componentDidMount() {
    this.props.fetchPmSessionList();
  }

  endReached() {
    let {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.pmSessionList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this.props.refreshPmSessionList({
      page: page + 1,
      isEndReached: true
    });
  }

  renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.pmSessionList;

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
          暂无私信
        </Text>
      </View>
    );
  }

  render() {
    let {
      pmSessionList,
      navigation,
      refreshPmSessionList,
      markPmAsRead,
      currentUserId
    } = this.props;
    let realPmSessionList = [];
    let isRefreshing = false;

    if (pmSessionList.list) {
      realPmSessionList = pmSessionList.list;
      isRefreshing = pmSessionList.isRefreshing;
    };

    return (
      <FlatList
        data={realPmSessionList}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderItem={({ item: session }) => {
          return (
            <PmSessionItem
              key={session.topic_id}
              session={session}
              navigation={navigation}
              currentUserId={currentUserId}
              markPmAsRead={({ plid }) => markPmAsRead({ plid })}/>
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => this.renderFooter()}
        ListEmptyComponent={() => !isRefreshing && this.renderListEmptyComponent()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => refreshPmSessionList({ page: 1 })}
            refreshing={isRefreshing} />
        } />
    );
  }
}
