import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView,
  ActivityIndicator,
  ListView
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../components/Header';
import { PopButton } from '../components/button';
import {
  submit,
  resetPublish
} from '../actions/message/sendAction';
import {
  fetchPmList,
  resetPmList,
  resetPmListResponseStatus
} from '../actions/message/pmListAction';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import styles from '../styles/containers/_PmList';

const LOGIN_USER_ID = Symbol();

class PmList extends Component {
  constructor(props) {
    super(props);

    this.userId = this.props.passProps.userId;
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.props.fetchPmList({
      userId: this.userId,
      page: 1
    });
  }

  componentWillUnmount() {
    this.props.resetPmList();
  }

  componentWillReceiveProps(nextProps) {
    let {
      send,
      pmList
    } = nextProps;

    if (send.isPublishing) { return; }

    if (pmList.isRefreshing)　{ return; }

    if (send.response && send.response.rs) {
      this.props.resetPublish();
      // if we just append new message into state without fetching from server,
      // then if we want to load earlier messages, we will get warnings that
      // we want to render messages which have same `_id`.
      this.componentDidMount();
      return;
    }

    // translation from Redux store props to component state
    if (pmList.response && pmList.response.rs) {
      this.setState({
        messages: pmList.list
      });
      this.props.resetPmListResponseStatus();
    }
  }

  _loadEarlierMessages(page) {
    this.props.fetchPmList({
      userId: this.userId,
      page
    });
  }

  _onSend({ messages, toUserId }) {
    this.setState(perviousState => {
      return {
        messages: GiftedChat.append(perviousState.messages, Object.assign({}, messages[0], { isNew: true }))
      };
    });

    this.props.submit({
      newMessage: messages[0],
      toUserId
    });
  }

  render() {
    let {
      router,
      pmList: {
        isRefreshing,
        hasPrev,
        user,
        page
      },
      send
    } = this.props;

    if (isRefreshing && page === 0) {
      return (
        <View style={mainStyles.container}>
          <Header title={user.name}>
            <PopButton router={router} />
          </Header>
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    let messages = this.state.messages.map(item => {
      if (item.isNew) { return item };

      return {
        _id: item.mid,
        text: item.content,
        createdAt: new Date(+item.time),
        user: {
          _id: (item.sender === user.id) && item.sender || LOGIN_USER_ID,
          avatar: (item.sender === user.id) && user.avatar
        }
      };
    });

    return (
      <View style={mainStyles.container}>
        <Header title={user.name}>
          <PopButton router={router} />
        </Header>
        <GiftedChat
          style={mainStyles.container}
          locale={'zh-cn'}
          isLoadingEarlier={isRefreshing && page > 1}
          loadEarlier={hasPrev}
          renderAvatarOnTop={true}
          onLoadEarlier={() => this._loadEarlierMessages(page + 1)}
          onSend={messages => this._onSend({
            messages,
            toUserId: user.id
          })}
          renderTicks={message => {
            if (!message.isNew) { return; }

            return (
              <View style={styles.tickView}>
                {send.isPublishing && <Text style={styles.tick}>发布中...</Text>}
              </View>
            );
          }}
          messages={messages}
          user={{ _id: LOGIN_USER_ID }}/>
      </View>
    );
  }
}

function mapStateToProps({ pmList, send }) {
  return {
    pmList,
    send
  };
}

export default connect(mapStateToProps, {
  fetchPmList,
  resetPmList,
  resetPmListResponseStatus,
  submit,
  resetPublish
})(PmList);
