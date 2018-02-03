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

const TABS = [
  { label: '最新发表', type: 'publish' },
  { label: '最新回复', type: 'all' },
  { label: '今日热门', type: 'hot' }
];

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    let { alertCount, isLogin, handleModalCallback } = _.get(navigation, ['state', 'params'], {});
    return {
      title: '清水河畔',
      headerLeft: (
        <MenuButton
          navigation={navigation}
          alertCount={alertCount} />
      ),
      headerRight: (
        isLogin &&
          <PublishButton
            onPress={() => navigation.navigate('ForumListModal', {
              callback: () => this.handleModalCallback()
            })} />
      )
    };
  }

  constructor(props) {
    super(props);
    this.boardId = 'all';
  }

  componentDidMount() {
    let {
      userId,
      alertCount
    } = this.props;
    this.props.navigation.setParams({
      isLogin: !!userId,
      alertCount,
      handleModalCallback: () => this.handleModalCallback()
    });
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  componentWillReceiveProps(nextProps) {
    let lastUserId = this.props.userId;
    let lastAlertCount = this.props.alertCount;
    let {
      userId,
      alertCount
    } = nextProps;

    // Only update header if any necessary information updated.
    if (lastUserId !== userId || lastAlertCount !== alertCount) {
      this.props.navigation.setParams({
        isLogin: !!userId,
        alertCount,
        handleModalCallback: () => this.handleModalCallback()
      });
    }
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
      userId
    } = this.props;

    return (
      <View style={mainStyles.container}>
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

function mapStateToProps({ topicList, alert, user }) {
  return {
    userId: _.get(user, ['authrization', 'uid']),
    topicList,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList
})(Home);
