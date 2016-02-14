import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import Header from './Header';
import TopicItem from './TopicItem';
import { PopButton, PublishButton } from './common';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';
import PublishModal from './modal/PublishModal';
import { publish } from '../actions/topic/topicAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ForumDetail extends Component {
  constructor(props) {
    super(props);
    ({
      board_id: this.boardId,
      board_name: this.boardName
    } = this.props.passProps);
  }

  componentDidMount() {
    this._fetchTopicList();
  }

  _refreshTopic(page, isEndReached) {
    this.props.dispatch(invalidateTopicList());
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, isEndReached, 'new', page));
  }

  _fetchTopicList() {
    this.props.dispatch(fetchTopicListIfNeeded(this.boardId, false, 'new'));
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
      isEndReached
    } = this.props.list.topicList;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicatorIOS />
      </View>
    );
  }

  _publish(topic) {
    let { typeId, title, content } = topic;

    this.props.dispatch(publish(
      this.boardId,
      null,
      null,
      typeId,
      title,
      content
    ));
  }

  render() {
    const { topicList } = this.props.list;
    const { comment } = this.props.entity;
    const source = ds.cloneWithRows(topicList.list);

    return (
      <View style={mainStyles.container}>
        <PublishModal
          ref={component => this._publishModal = component}
          visible={false}
          comment={comment}
          types={topicList.typeList}
          handlePublish={topic => this._publish(topic)}
          fetchTopicList={() => this._fetchTopicList()} />

        <Header
          title={this.boardName}
          comment={comment}>
          <PopButton router={this.props.router} />
          <PublishButton
            onPress={() => this._publishModal.openPublishModal()} />
        </Header>
        <ControlledRefreshableListView
          dataSource={source}
          renderRow={(topic) => <TopicItem key={topic.topic_id} topic={topic} router={this.props.router} />}
          onRefresh={() => this._refreshTopic()}
          isRefreshing={topicList.isRefreshing}
          onEndReached={() => this._endReached()}
          onEndReachedThreshold={0}
          renderFooter={() => this._renderFooter()} />
      </View>
    );
  }
}
