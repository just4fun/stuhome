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
import { MenuButton, PublishButton } from '../components/button';
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';
import { getAlertCount } from '../selectors/alert';
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

  constructor(props) {
    super(props);
    this.boardId = 'all';
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

  handleModalCallback() {
    this.props.invalidateTopicList({
      boardId: this.boardId,
      sortType: 'publish'
    });
    this.scrollableTabView.goToPage(0);
  }

  render() {
    let {
      navigation,
      topicList,
      forumList,
      userId,
      alertCount
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header
          title='清水河畔'
          navigation={navigation}
          alertCount={alertCount}
          isPublishFromHomePage={true}>
          {userId &&
            <PublishButton
              onPress={() => navigation.navigate('ForumListModal', {
                callback: () => this.handleModalCallback()
              })} />
            ||
            <Text></Text>
          }
        </Header>
        <ScrollableTabView
          ref={component => this.scrollableTabView = component}
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

function mapStateToProps({ topicList, forumList, alert, user }) {
  return {
    userId: _.get(user, ['authrization', 'uid']),
    topicList,
    forumList,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList,
  invalidateForumList,
  fetchForumList
})(Home);
