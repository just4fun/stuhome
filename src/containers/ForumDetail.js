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
import { submit, resetPublish } from '../actions/topic/publishAction';
import { invalidateTopicList, fetchTopicList, resetTopicList } from '../actions/topic/topicListAction';
import { invalidateForumList, fetchForumList } from '../actions/forumAction';

const TABS = [
  { label: '最新发表', type: 'publish' },
  { label: '最新回复', type: 'all' },
  { label: '精华', type: 'essence' }
];

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

    this.state = {
      isPublishModalOpen: false
    };
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
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  _refreshTopicList(page, isEndReached, sortType) {
    this.props.invalidateTopicList();
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached,
      sortType,
      page
    });
  }

  changeTab(e) {
    if (e.i === 0) { return; }

    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: this._getSortType(e.i)
    });
  }

  _getSortType(tabIndex) {
    if (tabIndex === 1) { return 'all'; }

    if (tabIndex === 2) { return 'essence'; }
  }

  _fetchForumList() {
    this.props.fetchForumList({
      boardId: this.boardId
    });;
  }

  _refreshForumList() {
    this.props.invalidateForumList();
    this._fetchForumList();
  }

  _publish(topic) {
    let { typeId, title, content } = topic;

    this.props.submit({
      boardId: this.boardId,
      topicId: null,
      replyId: null,
      typeId,
      title,
      content
    });
  }

  togglePublishModal(visible) {
    this.setState({
      isPublishModalOpen: visible
    });
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
    let { isPublishModalOpen } = this.state;
    let realTypeList = [];

    if (topicList.list[this.boardId]) {
      realTypeList = topicList.list[this.boardId].typeList;
    }

    return (
      <View style={mainStyles.container}>
        {isPublishModalOpen &&
          <PublishModal
            {...this.props}
            visible={isPublishModalOpen}
            publish={publish}
            types={realTypeList}
            closePublishModal={() => this.togglePublishModal(false)}
            handlePublish={topic => this._publish(topic)} />
        }

        <Header
          title={this.boardName}>
          <PopButton router={router} />
          {token &&
            <PublishButton
              onPress={() => this.togglePublishModal(true)} />
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
            tabBarTextStyle={scrollableTabViewStyles.tabBarText}
            onChangeTab={e => this.changeTab(e)}>
            {TABS.map((tab, index) => {
               return (
                 <TopicList
                   key={index}
                   tabLabel={tab.label}
                   router={router}
                   hasType={true}
                   typeId={this.boardId}
                   type={tab.type}
                   topicList={topicList}
                   refreshTopicList={(page, isEndReached, sortType) => this._refreshTopicList(page, isEndReached, sortType)} />
               );
             })
            }
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
          <ScrollableTabView
            tabBarBackgroundColor={colors.lightBlue}
            tabBarActiveTextColor={colors.white}
            tabBarInactiveTextColor={colors.white}
            tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
            tabBarTextStyle={scrollableTabViewStyles.tabBarText}
            onChangeTab={e => this.changeTab(e)}>
            {TABS.map((tab, index) => {
               return (
                 <TopicList
                   key={index}
                   tabLabel={tab.label}
                   router={router}
                   hasType={true}
                   typeId={this.boardId}
                   type={tab.type}
                   topicList={topicList}
                   refreshTopicList={(page, isEndReached, sortType) => this._refreshTopicList(page, isEndReached, sortType)} />
               );
             })
           }
          </ScrollableTabView>
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
  fetchTopicList,
  resetTopicList,
  invalidateForumList,
  fetchForumList
})(ForumDetail);
