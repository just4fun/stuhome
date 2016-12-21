import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import NotifyList from '../components/NotifyList';
import ReplyModal from '../components/modal/ReplyModal';
import { invalidateNotifyList, fetchNotifyListIfNeeded } from '../actions/message/notifyListAction';
import { submit, resetReply } from '../actions/topic/topicAction';

class Message extends Component {
  _fetchNotifyList(notifyType) {
    this.props.fetchNotifyListIfNeeded(notifyType);
  }

  _refreshNotifyList(notifyType, page, isEndReached) {
    this.props.invalidateNotifyList();
    this.props.fetchNotifyListIfNeeded(notifyType, isEndReached, page);
  }

  _publish({ boardId, topicId, replyId, content }) {
    this.props.submit(
      boardId,
      topicId,
      replyId,
      null,
      null,
      content
    );
  }

  render() {
    let {
      notifyList,
      reply,
      router
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <ReplyModal
          ref={component => this._replyNotificationModal = component}
          visible={false}
          reply={reply}
          resetReply={() => this.props.resetReply()}
          handlePublish={comment => this._publish(comment)} />
        <Header title='消息'
                updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <ScrollableTabView
          tabBarBackgroundColor={colors.lightBlue}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.white}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
          <NotifyList
            tabLabel='@'
            notifyType='at'
            notifyList={notifyList}
            router={router}
            fetchNotifyList={(notifyType) => this._fetchNotifyList(notifyType)}
            refreshNotifyList={(notifyType, page, isEndReached) => this._refreshNotifyList(notifyType, page, isEndReached)}
            openReplyModal={notification => this._replyNotificationModal.openReplyModal(notification)} />
          <NotifyList
            tabLabel='回复'
            notifyType='post'
            notifyList={notifyList}
            router={router}
            fetchNotifyList={(notifyType) => this._fetchNotifyList(notifyType)}
            refreshNotifyList={(notifyType, page, isEndReached) => this._refreshNotifyList(notifyType, page, isEndReached)}
            openReplyModal={notification => this._replyNotificationModal.openReplyModal(notification)} />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { notifyList, reply } = state;

  return {
    notifyList,
    reply
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyListIfNeeded,
  submit,
  resetReply
})(Message);
