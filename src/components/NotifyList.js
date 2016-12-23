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
  constructor(props) {
    super(props);

    this.notifyType = this.props.notifyType;
    this.isAtList = this.notifyType === 'at';
  }

  componentDidMount() {
    this.props.fetchNotifyList(this.notifyType);
  }

  _endReached() {
    const {
      hasMore,
      isFetchingAtList,
      isFetchingReplyList,
      isEndReached,
      page,
      list
    } = this.props.notifyList;

    let isRefreshing = this.isAtList ? isFetchingAtList : isFetchingReplyList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this.props.refreshNotifyList(this.notifyType, page + 1, true);
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
    let { notifyList, notifyType, reply } = this.props;
    let { isFetchingAtList, isFetchingReplyList } = notifyList;
    let isRefreshing = this.isAtList ? isFetchingAtList : isFetchingReplyList;
    let realNotifyList = [];

    if (notifyList.list[notifyType]) {
      realNotifyList = notifyList.list[notifyType].notifyList;
    };

    let refreshControl = <RefreshControl
                       title='正在加载...'
                       onRefresh={() => this.props.refreshNotifyList(this.notifyType)}
                       refreshing={isRefreshing} />;

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
        refreshControl={refreshControl} />
    );
  }
}
