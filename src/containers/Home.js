import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import PublishModal from '../components/modal/PublishModal';
import ForumListModal from '../components/modal/ForumListModal';
import { MenuButton, PublishButton } from '../components/button';
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';
import { getAlertCount } from '../selectors/alert';
import { submit, resetPublish } from '../actions/topic/publishAction';
import { invalidateForumList, fetchForumList } from '../actions/forumAction';

const TABS = [
  { label: '最新发表', type: 'publish' },
  { label: '最新回复', type: 'all' },
  { label: '今日热门', type: 'hot' }
];

class Home extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  fetchForumList() {
    this.props.fetchForumList({
      boardId: this.boardId
    });
  }

  // refreshForumList() {
  //   this.props.invalidateForumList({
  //     boardId: this.boardId
  //   });
  //   this.fetchForumList();
  // }

  refreshTopicList({ page, isEndReached, sortType }) {
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
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: TABS[e.i].type
    });
  }

  // toggleForumListModal(visible) {
  //   this.setState({
  //     isForumListModalOpen: visible
  //   });
  // }

  // togglePublishModal(visible) {
  //   this.setState({
  //     isPublishModalOpen: visible
  //   });
  // }

  // selectForum(forum) {
  //   this.setState({ selectedForumId: forum.board_id });
  //   this.toggleForumListModal(false);
  //   this.togglePublishModal(true);
  //   // This is manily to fetch topic types for each forum.
  //   this.props.fetchTopicList({
  //     boardId: forum.board_id,
  //     isEndReached: false,
  //     sortType: 'publish'
  //   });
  // }

  // publish({ typeId, title, images, content }) {
  //   this.props.submit({
  //     boardId: this.state.selectedForumId,
  //     topicId: null,
  //     replyId: null,
  //     typeId,
  //     title,
  //     images,
  //     content
  //   });
  // }

  render() {
    let {
      navigation,
      topicList,
      forumList,
      userId,
      publish,
      alertCount
    } = this.props;

    return (
      <View style={mainStyles.container}>
        {
          // isForumListModalOpen &&
          //   <ForumListModal
          //     visible={isForumListModalOpen}
          //     forumList={forumList}
          //     closeForumListModal={() => this.toggleForumListModal(false)}
          //     handleSelectForum={(forum) => this.selectForum(forum)}
          //     fetchForumList={() => this.fetchForumList()}
          //     refreshForumList={() => this.refreshForumList()} />
        }
        {
          // isPublishModalOpen &&
          //   <PublishModal
          //     {...this.props}
          //     visible={isPublishModalOpen}
          //     publish={publish}
          //     types={_.get(topicList, [selectedForumId, 'typeList'], [])}
          //     closePublishModal={() => this.togglePublishModal(false)}
          //     handlePublish={topic => this.publish(topic)} />
        }
        <Header
          title='清水河畔'
          navigation={navigation}
          alertCount={alertCount}
          isPublishFromHomePage={true}>
          {userId &&
            <PublishButton
              onPress={() => navigation.navigate('ForumListModal')} />
            ||
            <Text></Text>
          }
        </Header>
        <ScrollableTabView
          tabBarActiveTextColor={colors.blue}
          tabBarInactiveTextColor={colors.lightBlue}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}
          onChangeTab={e => this.changeTab(e)}>
          {TABS.map((tab, index) => {
            return (
              <TopicList
                key={index}
                currentUserId={userId}
                tabLabel={tab.label}
                navigation={navigation}
                type={tab.type}
                topicList={_.get(topicList, [this.boardId, tab.type], {})}
                refreshTopicList={({ page, isEndReached }) => this.refreshTopicList({ page, isEndReached, sortType: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ topicList, forumList, alert, user, publish }) {
  return {
    userId: _.get(user, ['authrization', 'uid']),
    topicList,
    forumList,
    alertCount: getAlertCount(alert),
    publish
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList,
  submit,
  resetPublish,
  invalidateForumList,
  fetchForumList
})(Home);
