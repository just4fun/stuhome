import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import NotifyItem from './NotifyItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class NotifyList extends Component {
  componentDidMount() {
    this.props.fetchNotifyList();
  }

  _endReached() {
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

  _renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.notifyList;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    let { notifyList } = this.props;
    let realNotifyList = [];
    let isRefreshing = false;

    if (notifyList.list) {
      realNotifyList = notifyList.list;
      isRefreshing = notifyList.isRefreshing;
    };

    let source = ds.cloneWithRows(realNotifyList);

    return (
      <ListView
        dataSource={source}
        enableEmptySections={true}
        renderRow={notification => {
          return (
            <NotifyItem
              key={notification.topic_id}
              notification={notification}
              router={this.props.router}
              openReplyModal={notification => this.props.openReplyModal(notification)} />
          );
        }}
        onEndReached={() => this._endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this._renderFooter()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => this.props.refreshNotifyList({})}
            refreshing={isRefreshing} />
        } />
    );
  }
}
