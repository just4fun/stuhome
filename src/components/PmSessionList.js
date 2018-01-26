import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import PmSessionItem from './PmSessionItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    let {
      pmSessionList,
      navigation,
      refreshPmSessionList,
      markAsRead,
      currentUserId
    } = this.props;
    let realPmSessionList = [];
    let isRefreshing = false;

    if (pmSessionList.list) {
      realPmSessionList = pmSessionList.list;
      isRefreshing = pmSessionList.isRefreshing;
    };

    let source = ds.cloneWithRows(realPmSessionList);

    return (
      <ListView
        dataSource={source}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={session => {
          return (
            <PmSessionItem
              key={session.topic_id}
              session={session}
              navigation={navigation}
              currentUserId={currentUserId}
              markAsRead={({ plid }) => markAsRead({ plid })}/>
          );
        }}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this.renderFooter()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => refreshPmSessionList({ page: 1 })}
            refreshing={isRefreshing} />
        } />
    );
  }
}
