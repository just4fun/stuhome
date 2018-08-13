import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Header from '~/components/Header/Header';
import TopicList from '~/components/TopicList/TopicList';
import MenuButton from '~/components/MenuButton/MenuButton';
import PublishButton from '~/components/PublishButton/PublishButton';
import { invalidateTopicList, fetchTopicList } from '~/common/modules/topic/topicList.ducks';
import { getAlertCount } from '~/selectors/alert';

import scrollableTabViewStyles from '~/common/styles/ScrollableTabView.style';
import mainStyles from '~/common/styles/Main.style';
import colors from '~/common/styles/colors.style';

const TABS = [
  { label: '最新回复', type: 'all' },
  { label: '最新发表', type: 'publish' },
  { label: '今日热门', type: 'hot' }
];

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    let { alertCount, isLogin } = _.get(navigation, ['state', 'params'], {});
    return {
      title: '清水河畔',
      headerLeft: (
        <MenuButton
          isLogin={isLogin}
          navigation={navigation}
          alertCount={alertCount} />
      ),
      headerRight: (
        isLogin &&
          <PublishButton
            onPress={() => navigation.navigate('ForumListModal')} />
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
      alertCount
    });
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'all'
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
        alertCount
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

function mapStateToProps({ topicList, alert, session }) {
  return {
    userId: _.get(session, ['data', 'uid']),
    topicList,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList
})(Home);
