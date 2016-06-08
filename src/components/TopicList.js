import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  RefreshControl,
  ActivityIndicatorIOS
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import TopicItem from './TopicItem';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class TopicList extends Component {
  constructor(props) {
    super(props);

    var forum = props.passProps;
    this.boardId = forum && forum.board_id || 'all';
  }

  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, false, 'all'));
  }

  _refreshTopicList(page, isEndReached) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, isEndReached, 'all', page));
  }

  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.list.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    /**
    * `onEndReached` will be triggered when we want to access a forum
    * without logging in, that will leads the error alter appears two
    * times, so check whether there are topics already to avoid this issue.
    */
    if (!list[this.boardId].topicList.length) { return; }

    this._refreshTopicList(page + 1, true);
  }

  _renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.list.topicList;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicatorIOS />
      </View>
    );
  }

  render() {
    let { topicList } = this.props.list;

    if (!topicList.list[this.boardId]) {
      topicList.list[this.boardId] = {
        typeList: [],
        topicList: []
      };
    }

    let realTopicList = topicList.list[this.boardId].topicList;
    let source = ds.cloneWithRows(realTopicList);

    return (
      <ListView
        dataSource={source}
        renderRow={topic => {
          return (
            <TopicItem
              key={topic.topic_id}
              topic={topic}
              router={this.props.router} />
          )
        }}
        onEndReached={() => this._endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this._renderFooter()}
        refreshControl={
          <RefreshControl
            title='正在加载...'
            onRefresh={() => this._refreshTopicList()}
            refreshing={topicList.isRefreshing} />
        } />
    );
  }
}

module.exports = TopicList;
