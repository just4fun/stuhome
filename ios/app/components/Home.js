import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import { invalidateTopic, fetchTopicIfNeeded } from '../actions/index';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopicIfNeeded('new'));
  }

  _refreshTopic(page) {
    this.props.dispatch(invalidateTopic());
    this.props.dispatch(fetchTopicIfNeeded('new', page));
  }

  _endReached() {
    const { topic, isFetching } = this.props;
    const hasMore = topic.has_next;
    const page = topic.page;

    if (!hasMore || isFetching) { return; }

    this._refreshTopic(page + 1);
  }

  render() {
    const { dispatch, topic, isFetching } = this.props;
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
        isRefreshing={isFetching}
        onEndReached={this._endReached.bind(this)}
        onEndReachedThreshold={100}
         />
    );
  }
}
