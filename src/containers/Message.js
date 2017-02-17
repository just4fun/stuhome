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
import { invalidateNotifyList, fetchNotifyList } from '../actions/message/notifyListAction';
import { submit } from '../actions/topic/publishAction';
import { resetReply } from '../actions/topic/replyAction';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyModalOpen: false,
      currentNotification: null
    };
  }

  _fetchNotifyList(notifyType) {
    this.props.fetchNotifyList({ notifyType });
  }

  _refreshNotifyList(notifyType, page, isEndReached) {
    this.props.invalidateNotifyList();
    this.props.fetchNotifyList({
      notifyType,
      isEndReached,
      page
    });
  }

  _publish({ boardId, topicId, replyId, content }) {
    this.props.submit({
      boardId,
      topicId,
      replyId,
      typeId: null,
      title: null,
      content
    });
  }

  toggleReplyModal(visible, notification) {
    this.setState({
      isReplyModalOpen: visible,
      currentNotification: notification
    });
  }

  render() {
    let {
      notifyList,
      reply,
      router
    } = this.props;
    let { isReplyModalOpen, currentNotification } = this.state;

    return (
      <View style={mainStyles.container}>
        {isReplyModalOpen &&
          <ReplyModal
            visible={isReplyModalOpen}
            content={currentNotification}
            reply={reply}
            resetReply={() => this.props.resetReply()}
            closeReplyModal={() => this.toggleReplyModal(false)}
            handlePublish={comment => this._publish(comment)} />
        }
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
            openReplyModal={notification => this.toggleReplyModal(true, notification)} />
          <NotifyList
            tabLabel='回复'
            notifyType='post'
            notifyList={notifyList}
            router={router}
            fetchNotifyList={(notifyType) => this._fetchNotifyList(notifyType)}
            refreshNotifyList={(notifyType, page, isEndReached) => this._refreshNotifyList(notifyType, page, isEndReached)}
            openReplyModal={notification => this.toggleReplyModal(true, notification)} />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ notifyList, reply }) {
  return {
    notifyList,
    reply
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyList,
  submit,
  resetReply
})(Message);
