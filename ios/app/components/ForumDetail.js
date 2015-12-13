import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import { PopButton } from './common';
import Header from './Header';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import TopicItem from './TopicItem';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ForumDetail extends Component {
  constructor(props) {
    super(props);
    this.boardId = this.props.passProps.board_id;
    this.boardName = this.props.passProps.board_name;
  }

  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, false, 'new'));
  }

  _refreshTopic(page, isEndReached) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, isEndReached, 'new', page));
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
      <View style={mainStyles.container}>
        <Header title={this.boardName}>
          <PopButton router={this.props.router} />
        </Header>
        <ControlledRefreshableListView
          dataSource={source}
          renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} router={this.props.router} />}
          onRefresh={this._refreshTopic.bind(this)}
          isRefreshing={topicList.isRefreshing}
          onEndReached={this._endReached.bind(this)}
          onEndReachedThreshold={0}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    );
  }
}
