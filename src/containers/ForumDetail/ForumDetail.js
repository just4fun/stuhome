import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS
} from 'react-native';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopicList from '~/components/TopicList/TopicList';
import ForumItems from '~/components/ForumItems/ForumItems';
import PublishModal from '~/components/PublishModal/PublishModal';
import PublishButton from '~/components/PublishButton/PublishButton';
import { invalidateTopicList, fetchTopicList, resetTopicList } from '~/modules/topic/topicList/topicList.ducks';
import { invalidateForumList, fetchForumList } from '~/modules/forum/forumList.ducks';

import mainStyles from '~/common/styles/Main.style';
import scrollableTabViewStyles from '~/common/styles/ScrollableTabView.style';
import colors from '~/common/styles/colors.style';

const TABS = [
  { label: '最新回复', type: 'all' },
  { label: '最新发表', type: 'publish' },
  { label: '精华', type: 'essence' }
];

class ForumDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    let { title, isLogin, boardId, handleModalCallback } = navigation.state.params;
    return {
      title,
      headerRight: (
        isLogin &&
          <PublishButton
            onPress={() => navigation.navigate('PublishModal', {
              boardId,
              callback: () => handleModalCallback()
            })} />
      )
    };
  }

  constructor(props) {
    super(props);

    let {
      board_id,
      board_name,
      board_content,
      board_child
    } = props.navigation.state.params;
    this.boardId = board_id;
    this.boardName = board_name;
    this.boardContent = !!board_content;
    this.boardChild = !!board_child;
  }

  componentWillReceiveProps(nextProps) {
    let errCode = _.get(nextProps, ['topicList', this.boardId, 'all', 'errCode'], '');
    if (errCode) {
      AlertIOS.alert('提示', errCode);
      // Clean error message.
      nextProps.resetTopicList({
        boardId: this.boardId,
        sortType: 'all'
      });
      nextProps.navigation.goBack();
    }
  }

  componentDidMount() {
    // Set up header.
    this.props.navigation.setParams({
      title: this.boardName,
      isLogin: !!this.props.userId,
      boardId: this.boardId,
      handleModalCallback: () => this.handleModalCallback()
    });
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'all'
    });
  }

  handleModalCallback() {
    this.props.invalidateTopicList({
      boardId: this.boardId,
      sortType: 'all'
    });
    this.scrollableTabView.goToPage(0);
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
    // `子版块` has no need to fetch topic list
    if (e.i === 3) { return; }

    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: TABS[e.i].type
    });
  }

  fetchForumList() {
    this.props.fetchForumList({
      boardId: this.boardId
    });;
  }

  refreshForumList() {
    this.props.invalidateForumList({
      boardId: this.boardId
    });
    this.fetchForumList();
  }

  render() {
    let {
      topicList,
      forumList,
      publish,
      userId,
      navigation
    } = this.props;

    return (
      <View style={mainStyles.container}>
        {this.boardContent && this.boardChild &&
          <ScrollableTabView
            ref={component => this.scrollableTabView = component}
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
                  currentUserId={userId}
                  tabLabel={tab.label}
                  navigation={navigation}
                  type={tab.type}
                  accessTopicListFromForumItem={true}
                  topicList={_.get(topicList, [this.boardId, tab.type], {})}
                  refreshTopicList={({ page, isEndReached }) => this.refreshTopicList({ page, isEndReached, sortType: tab.type })} />
              );
            })}
            <ForumItems
              tabLabel='子版块'
              navigation={navigation}
              boardId={this.boardId}
              forumList={_.get(forumList, this.boardId, {})}
              shouldFetchDataInside={true}
              fetchForumList={() => this.fetchForumList()}
              refreshForumList={() => this.refreshForumList()} />
          </ScrollableTabView>
        }
        {this.boardContent && !this.boardChild &&
          <ScrollableTabView
            ref={component => this.scrollableTabView = component}
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
                  currentUserId={userId}
                  tabLabel={tab.label}
                  navigation={navigation}
                  type={tab.type}
                  accessTopicListFromForumItem={true}
                  topicList={_.get(topicList, [this.boardId, tab.type], {})}
                  refreshTopicList={({ page, isEndReached }) => this.refreshTopicList({ page, isEndReached, sortType: tab.type })} />
              );
            })}
          </ScrollableTabView>
        }
        {!this.boardContent && this.boardChild &&
          <ForumItems
            navigation={navigation}
            boardId={this.boardId}
            forumList={_.get(forumList, this.boardId, {})}
            refreshForumList={() => this.refreshForumList()} />
        }
      </View>
    );
  }
}

function mapStateToProps({ topicList, forumList, session }) {
  return {
    userId: _.get(session, ['data', 'uid']),
    topicList,
    forumList
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList,
  resetTopicList,
  invalidateForumList,
  fetchForumList
})(ForumDetail);
