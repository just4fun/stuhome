import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import indicatorStyles from '../styles/common/_Indicator';
import TopicItem from './TopicItem';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class TopicList extends Component {
  constructor(props) {
    super(props);

    this.type = this.props.individualType;
  }

  scrollToTop() {
    this.topicList.scrollTo({ x: 0 });
  }

  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page,
      list
    } = this.props.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    /**
    * `onEndReached` will be triggered when we want to access a forum
    * without logging in, that will leads the error alter appears two
    * times, so check whether there are topics already to avoid this issue.
    */
    // if (!list[this.props.boardId].topicList.length) { return; }

    this.props.refreshTopicList(page + 1, true, this.type);
  }

  _renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.topicList;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    let { topicList, typeId, isSearch, isIndividual, individualType } = this.props;
    let realTopicList = [];
    let refreshControl = null;

    if (!isSearch) {
      if (isIndividual) {
        if (topicList.list[typeId] && topicList.list[typeId][individualType]) {
          realTopicList = topicList.list[typeId][individualType].topicList;
        };
      } else {
        if (topicList.list[typeId]) {
          realTopicList = topicList.list[typeId].topicList;
        };
      }

      refreshControl = <RefreshControl
                         title='正在加载...'
                         onRefresh={() => this.props.refreshTopicList(1, false, individualType)}
                         refreshing={topicList.isRefreshing} />;
    } else {
      realTopicList = topicList.list;
    }

    let source = ds.cloneWithRows(realTopicList);

    return (
      <ListView
        ref={component => this.topicList = component}
        dataSource={source}
        enableEmptySections={true}
        renderRow={topic => {
          return (
            <TopicItem
              key={topic.topic_id}
              topic={topic}
              router={this.props.router} />
          );
        }}
        onEndReached={() => this._endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this._renderFooter()}
        refreshControl={refreshControl} />
    );
  }
}
