import React, {
  Component,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topicAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(null, 'new'));
  }

  _refreshTopic(page) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(null, 'new', page));
  }

  _endReached() {
    const { dispatch, list } = this.props;
    const { topicList } = list;
    const { hasMore, isFetching, page } = topicList;

    if (!hasMore || isFetching) { return; }

    this._refreshTopic(page + 1);
  }

  render() {
    const { dispatch, list } = this.props;
    const { topicList } = list;
    const source = ds.cloneWithRows(topicList.list);

    return (
      /**
       * use `ControlledRefreshableListView` instead of `RefreshableListView` here
       * since `_refreshTopic` won't return Promise which `loadData` needs to control
       * the refreshing status. That being said, we should use `onRefresh` and `isRefreshing`
       * to manually control it.
       */
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} router={this.props.router} />}
        onRefresh={this._refreshTopic.bind(this)}
        isRefreshing={topicList.isFetching}
        onEndReached={this._endReached.bind(this)}
        onEndReachedThreshold={100}
       />
    );
  }
}
