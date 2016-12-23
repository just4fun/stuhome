import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import ForumItems from '../components/ForumItems';
import PublishModal from '../components/modal/PublishModal';
import { PopButton, PublishButton } from '../components/button';
import { submit, resetPublish } from '../actions/topic/topicAction';
import { invalidateTopicList, fetchTopicListIfNeeded, resetTopicList } from '../actions/topic/topicListAction';
import { invalidateForumList, fetchForumListIfNeeded } from '../actions/forumAction';

class ForumDetail extends Component {
  constructor(props) {
    super(props);

    let {
      board_id,
      board_name,
      board_content,
      board_child
    } = props.passProps;
    this.boardId = board_id;
    this.boardName = board_name;
    this.boardContent = !!board_content;
    this.boardChild = !!board_child;
  }

  componentWillReceiveProps(nextProps) {
    let { topicList } = nextProps;

    if (topicList.errCode) {
      AlertIOS.alert('提示', topicList.errCode);
      // clean error message
      nextProps.resetTopicList();
      nextProps.router.pop();
    }
  }

  componentDidMount() {
    this.props.fetchTopicListIfNeeded(this.boardId, false, 'all');
  }

  _refreshTopicList(page, isEndReached) {
    this.props.invalidateTopicList();
    this.props.fetchTopicListIfNeeded(this.boardId, isEndReached, 'all', page);
  }

  _fetchForumList() {
    this.props.fetchForumListIfNeeded(this.boardId);;
  }

  _refreshForumList() {
    this.props.invalidateForumList();
    this.props._fetchForumList();
  }

  _publish(topic) {
    let { typeId, title, content } = topic;

    this.props.submit(
      this.boardId,
      null,
      null,
      typeId,
      title,
      content
    );
  }

  render() {
    let {
      topicList,
      forumList,
      publish,
      user: {
        authrization: { token }
      },
      router
    } = this.props;

    let realTypeList = [];

    if (topicList.list[this.boardId]) {
      realTypeList = topicList.list[this.boardId].typeList;
    }

    return (
      <View style={mainStyles.container}>
        <PublishModal
          ref={component => this._publishModal = component}
          {...this.props}
          visible={false}
          publish={publish}
          types={realTypeList}
          handlePublish={topic => this._publish(topic)} />

        <Header
          title={this.boardName}>
          <PopButton router={router} />
          {token &&
            <PublishButton
              onPress={() => this._publishModal.openPublishModal()} />
            ||
            <Text></Text>
          }
        </Header>
        {this.boardContent && this.boardChild &&
          <ScrollableTabView
            tabBarBackgroundColor={colors.lightBlue}
            tabBarActiveTextColor={colors.white}
            tabBarInactiveTextColor={colors.white}
            tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
            tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
            <TopicList
              tabLabel='最新'
              router={router}
              boardId={this.boardId}
              topicList={topicList}
              refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
            <ForumItems
              tabLabel='子版块'
              router={router}
              boardId={this.boardId}
              forumList={forumList}
              shouldFetchDataInside={true}
              fetchForumList={() => this._fetchForumList()}
              refreshForumList={() => this._refreshForumList()} />
          </ScrollableTabView>
        }
        {this.boardContent && !this.boardChild &&
          <TopicList
            router={router}
            boardId={this.boardId}
            topicList={topicList}
            refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
        }
        {!this.boardContent && this.boardChild &&
          <ForumItems
            router={router}
            boardId={this.boardId}
            forumList={forumList}
            refreshForumList={() => this._refreshForumList()} />
        }
      </View>
    );
  }
}

function mapStateToProps({ topicList, forumList, publish, user }) {
  return {
    topicList,
    forumList,
    publish,
    user
  };
}

export default connect(mapStateToProps, {
  submit,
  resetPublish,
  invalidateTopicList,
  fetchTopicListIfNeeded,
  resetTopicList,
  invalidateForumList,
  fetchForumListIfNeeded
})(ForumDetail);
