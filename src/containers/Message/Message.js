import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MessageTabBar from '~/common/vendor/components/MessageTabBar';
import NotifyList from '~/components/NotifyList/NotifyList';
import PmSessionList from '~/components/PmSessionList/PmSessionList';
import ReplyModal from '~/components/ReplyModal/ReplyModal';
import MENUS from '~/constants/menus';
import { invalidateNotifyList, fetchNotifyList } from '~/common/modules/message/notifyList.ducks';
import { invalidatePmSessionList, fetchPmSessionList, markPmAsRead } from '~/common/modules/message/pmSessionList.ducks';
import { getAtMeCount, getReplyCount, getPmCount, getSystemCount } from '~/selectors/alert';

import mainStyles from '~/common/styles/Main.style';
import scrollableTabViewStyles from '~/common/styles/ScrollableTabView.style';
import colors from '~/common/styles/colors.style';

const TABS = [
  { label: '@', type: 'at' },
  { label: '回复', type: 'post' },
  { label: '私信', type: 'private' },
  { label: '系统提醒', type: 'system' }
];

class Message extends Component {
  static navigationOptions = {
    title: MENUS.message.title
  }

  fetchNotifyList({ page, isEndReached, notifyType }) {
    this.props.fetchNotifyList({
      page,
      notifyType,
      isEndReached
    });
  }

  refreshNotifyList({ page, isEndReached, notifyType }) {
    this.props.invalidateNotifyList({ notifyType });
    this.fetchNotifyList({
      page,
      notifyType,
      isEndReached
    });
  }

  fetchPmSessionList({ page, isEndReached }) {
    this.props.fetchPmSessionList({
      page,
      isEndReached
    });
  }

  refreshPmSessionList({ page, isEndReached }) {
    this.props.invalidatePmSessionList();
    this.fetchPmSessionList({
      page,
      isEndReached
    });
  }

  // This is a hacky way to allow customized tab label
  // for each tab of <ScrollableTabView /> component.
  getTabsWithAlertCount(tabs) {
    let newTabs = [];
    let { atMeCount, replyCount, pmCount, systemCount } = this.props;
    newTabs.push({ name: tabs[0], count: atMeCount });
    newTabs.push({ name: tabs[1], count: replyCount });
    newTabs.push({ name: tabs[2], count: pmCount });
    newTabs.push({ name: tabs[3], count: systemCount });
    return newTabs;
  }

  render() {
    let {
      notifyList,
      pmSessionList,
      reply,
      navigation,
      userId
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <ScrollableTabView
          renderTabBar={(props) => <MessageTabBar newTabs={this.getTabsWithAlertCount(props.tabs)} />}
          tabBarBackgroundColor={colors.lightBlue}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.white}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
          {TABS.map((tab, index) => {
            if (tab.type === 'private') {
              return (
                <PmSessionList
                  key={index}
                  tabLabel={tab.label}
                  pmSessionList={pmSessionList}
                  navigation={navigation}
                  currentUserId={userId}
                  markPmAsRead={({ plid }) => this.props.markPmAsRead({ plid })}
                  fetchPmSessionList={({ page }) => this.fetchPmSessionList({ page })}
                  refreshPmSessionList={({ page, isEndReached }) => this.refreshPmSessionList({ page, isEndReached })} />
              );
            }

            return (
              <NotifyList
                key={index}
                tabLabel={tab.label}
                notifyList={_.get(notifyList, tab.type, {})}
                currentUserId={userId}
                navigation={navigation}
                fetchNotifyList={() => this.fetchNotifyList({ notifyType: tab.type })}
                refreshNotifyList={({ page, isEndReached }) => this.refreshNotifyList({ page, isEndReached, notifyType: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ notifyList, pmSessionList, alert, session }) {
  return {
    notifyList,
    pmSessionList,
    atMeCount: getAtMeCount(alert),
    replyCount: getReplyCount(alert),
    pmCount: getPmCount(alert),
    systemCount: getSystemCount(alert),
    userId: _.get(session, ['data', 'uid'])
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyList,
  fetchPmSessionList,
  invalidatePmSessionList,
  markPmAsRead
})(Message);
