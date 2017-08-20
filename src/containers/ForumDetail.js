import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS
} from 'react-native';
import _ from 'lodash';
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
    let errCode = _.get(nextProps, ['topicList', this.boardId, 'publish', 'errCode'], '');

    if (errCode) {
      AlertIOS.alert('提示', errCode);
      // clean error message
      nextProps.resetTopicList({
        boardId: this.boardId,
        sortType: 'publish'
      });
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

  _refreshTopicList({ page, isEndReached, sortType }) {
    this.props.invalidateTopicList({
      boardId: this.boardId,
      sortType
    });
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached,
      sortType,
      page
    });
  }

  changeTab(e) {
    // `子版块` has no need to fetch topic list
    if (e.i === 3) { return; }

    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: TABS[e.i].type
    });
  }

  _fetchForumList() {
    this.props.fetchForumList({
      boardId: this.boardId
    });;
  }

  _refreshForumList() {
    this.props.invalidateForumList({
      boardId: this.boardId
    });
    this._fetchForumList();
  }

  _publish({ typeId, title, images, content }) {
    this.props.submit({
      boardId: this.boardId,
      topicId: null,
      replyId: null,
      typeId,
      title,
      images,
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

    return (
      <View style={mainStyles.container}>
        {isPublishModalOpen &&
          <PublishModal
            {...this.props}
            visible={isPublishModalOpen}
            publish={publish}
            types={_.get(topicList, [this.boardId, 'typeList'], [])}
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
                  type={tab.type}
                  accessTopicListFromForumItem={true}
                  topicList={_.get(topicList, [this.boardId, tab.type], {})}
                  refreshTopicList={({ page, isEndReached }) => this._refreshTopicList({ page, isEndReached, sortType: tab.type })} />
              );
            })}
            <ForumItems
              tabLabel='子版块'
              router={router}
              boardId={this.boardId}
              forumList={_.get(forumList, this.boardId, {})}
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
                  type={tab.type}
                  accessTopicListFromForumItem={true}
                  topicList={_.get(topicList, [this.boardId, tab.type], {})}
                  refreshTopicList={({ page, isEndReached }) => this._refreshTopicList({ page, isEndReached, sortType: tab.type })} />
              );
            })}
          </ScrollableTabView>
        }
        {!this.boardContent && this.boardChild &&
          <ForumItems
            router={router}
            boardId={this.boardId}
            forumList={_.get(forumList, this.boardId, {})}
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
