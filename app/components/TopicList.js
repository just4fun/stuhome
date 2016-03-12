import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import indicatorStyles from '../styles/common/_Indicator';
import TopicItem from './TopicItem';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TopicList extends Component {
  constructor(props) {
    super(props);

    var forum = props.passProps;
    if (forum) {
      this.boardId = forum.board_id;
      this.boardName = forum.board_name;
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, false, 'new'));
  }

  _refreshTopicList(page, isEndReached) {
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

    this._refreshTopicList(page + 1, true);
  }

  _renderFooter() {
    const {
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
    const { topicList } = this.props.list;
    const source = ds.cloneWithRows(topicList.list);

    return (
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} router={this.props.router} />}
        onRefresh={() => this._refreshTopicList()}
        isRefreshing={topicList.isRefreshing}
        onEndReached={() => this._endReached()}
        onEndReachedThreshold={0}
        renderFooter={() => this._renderFooter()} />
    );
  }
}
