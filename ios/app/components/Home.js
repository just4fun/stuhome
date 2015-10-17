import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import { invalidateTopic, fetchTopicsIfNeeded } from '../actions/index';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopicsIfNeeded('new'));
  }

  _refreshTopics() {
    this.props.dispatch(invalidateTopic());
    this.props.dispatch(fetchTopicsIfNeeded('new'));
  }

  render() {
    const { dispatch, topics, isFetching } = this.props;
    const source = ds.cloneWithRows(topics);

    return (
      /**
       * use `ControlledRefreshableListView` instead of `RefreshableListView` here
       * since `_refreshTopics` won't return Promise which `loadData` needs to control
       * the refreshing status. That being said, we should use `onRefresh` and `isRefreshing`
       * to manually control it.
       */
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} />}
        onRefresh={this._refreshTopics.bind(this)}
        isRefreshing={isFetching} />
    );
  }
}
