import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import NotifyList from '../components/NotifyList';
import PmSessionList from '../components/PmSessionList';
import MessageTabBar from '../components/3rd_party/MessageTabBar';
import ReplyModal from '../components/modal/ReplyModal';
import menus from '../constants/menus';
import { invalidateNotifyList, fetchNotifyList } from '../actions/message/notifyListAction';
import { invalidatePmSessionList, fetchPmSessionList, markAsRead } from '../actions/message/pmSessionListAction';
import { submit } from '../actions/topic/publishAction';
import { resetReply } from '../actions/topic/replyAction';
import { getAtMeCount, getReplyCount, getPmCount, getAlertCount } from '../selectors/alert';

const TABS = [
  { label: '@', type: 'at' },
  { label: '回复', type: 'post' },
  { label: '私信', type: 'private' }
];

class Message extends Component {
  static navigationOptions = {
    title: menus.message.title,
    drawerLockMode: 'locked-closed'
  }

  fetchNotifyList(notifyType) {
    this.props.fetchNotifyList({ notifyType });
  }

  refreshNotifyList({ page, isEndReached, notifyType }) {
    this.props.invalidateNotifyList({ notifyType });
    this.props.fetchNotifyList({
      notifyType,
      isEndReached,
      page
    });
  }

  fetchPmSessionList() {
    this.props.fetchPmSessionList({ page: 1 });
  }

  refreshPmSessionList({ page, isEndReached }) {
    this.props.invalidatePmSessionList();
    this.props.fetchPmSessionList({
      isEndReached,
      page
    });
  }

  _publish({ boardId, topicId, replyId, images, content }) {
    this.props.submit({
      boardId,
      topicId,
      replyId,
      typeId: null,
      title: null,
      images,
      content
    });
  }

  // This is a hacky way to allow customized tab label
  // for each tab of <ScrollableTabView /> component.
  getTabsWithAlertCount(tabs) {
    let newTabs = [];
    let { atMeCount, replyCount, pmCount } = this.props;
    newTabs.push({ name: tabs[0], count: atMeCount });
    newTabs.push({ name: tabs[1], count: replyCount });
    newTabs.push({ name: tabs[2], count: pmCount });
    return newTabs;
  }

  render() {
    let {
      notifyList,
      pmSessionList,
      reply,
      navigation,
      alertCount
    } = this.props;

    return (
      <View style={mainStyles.container}>
        {
        // isReplyModalOpen &&
        //   <ReplyModal
        //     visible={isReplyModalOpen}
        //     content={currentNotification}
        //     reply={reply}
        //     resetReply={() => this.props.resetReply()}
        //     closeReplyModal={() => this.toggleReplyModal(false)}
        //     handlePublish={comment => this._publish(comment)} />
        }
        {
        // <Header title='消息'
        //         alertCount={alertCount}
        //         updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        }
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
                  markAsRead={({ plid }) => this.props.markAsRead({ plid })}
                  fetchPmSessionList={() => this.fetchPmSessionList(tab.type)}
                  refreshPmSessionList={({ page, isEndReached }) => this.refreshPmSessionList({ page, isEndReached })} />
              );
            }

            return (
              <NotifyList
                key={index}
                tabLabel={tab.label}
                notifyList={_.get(notifyList, tab.type, {})}
                navigation={navigation}
                fetchNotifyList={() => this.fetchNotifyList(tab.type)}
                refreshNotifyList={({ page, isEndReached }) => this.refreshNotifyList({ page, isEndReached, notifyType: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ notifyList, reply, pmSessionList, alert }) {
  return {
    notifyList,
    reply,
    pmSessionList,
    atMeCount: getAtMeCount(alert),
    replyCount: getReplyCount(alert),
    pmCount: getPmCount(alert),
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyList,
  submit,
  resetReply,
  fetchPmSessionList,
  invalidatePmSessionList,
  markAsRead
})(Message);
