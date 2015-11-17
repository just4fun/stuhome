import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import indicatorStyles from '../styles/common/_Indicator';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topicAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(null, false, 'new'));
  }

  _refreshTopic(page, isEndReached) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(null, isEndReached, 'new', page));
  }

  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page
    } = this.props.list.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this._refreshTopic(page + 1, true);
  }

  _renderFooter() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page
    } = this.props.list.topicList;

    if (!hasMore || !isEndReached) { return <View></View>; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicatorIOS />
      </View>
    );
  }

  render() {
    const { topicList } = this.props.list;
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
        isRefreshing={topicList.isRefreshing}
        onEndReached={this._endReached.bind(this)}
        onEndReachedThreshold={0}
        renderFooter={this._renderFooter.bind(this)}
       />
    );
  }
}
