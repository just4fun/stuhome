import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import { getUserFromStorage } from '../actions/authorizeAction';
import { invalidateTopic, fetchTopicIfNeeded } from '../actions/topicAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getUserFromStorage());
    this.props.dispatch(fetchTopicIfNeeded('new'));
  }

  _refreshTopic(page) {
    this.props.dispatch(invalidateTopic());
    this.props.dispatch(fetchTopicIfNeeded('new', page));
  }

  _endReached() {
    const { dispatch, entities } = this.props;
    const { topic } = entities;
    const { hasMore, isFetching, page } = topic;

    if (!hasMore || isFetching) { return; }

    this._refreshTopic(page + 1);
  }

  render() {
    const { dispatch, entities } = this.props;
    const { topic } = entities;
    const source = ds.cloneWithRows(topic.list);

    return (
      /**
       * use `ControlledRefreshableListView` instead of `RefreshableListView` here
       * since `_refreshTopic` won't return Promise which `loadData` needs to control
       * the refreshing status. That being said, we should use `onRefresh` and `isRefreshing`
       * to manually control it.
       */
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} />}
        onRefresh={this._refreshTopic.bind(this)}
        isRefreshing={topic.isFetching}
        onEndReached={this._endReached.bind(this)}
        onEndReachedThreshold={100}
       />
    );
  }
}
