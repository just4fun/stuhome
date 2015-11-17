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

export default class ForumDetail extends Component {
  constructor(props) {
    super(props);
    this.boardId = this.props.passProps.board_id;
  }

  componentDidMount() {
    this.props.dispatch(fetchTopicListIfNeeded(true, this.boardId, 'new'));
  }

  _refreshTopic(isRefreshing, page) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(isRefreshing, this.boardId, 'new', page));
  }

  _endReached() {
    const {
      hasMore,
      isRefreshing,
      isEndReached,
      page
    } = this.props.list.topicList;

    if (!hasMore || isRefreshing || isEndReached) { return; }

    this._refreshTopic(false, page + 1);
  }

  render() {
    const { topicList } = this.props.list;
    const source = ds.cloneWithRows(topicList.list);

    return (
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} router={this.props.router} />}
        onRefresh={this._refreshTopic.bind(this)}
        isRefreshing={topicList.isRefreshing}
        onEndReached={this._endReached.bind(this)}
        onEndReachedThreshold={100}
       />
    );
  }
}
