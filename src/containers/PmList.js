import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import GiftedChatSendButton from '../components/3rd_party/GiftedChatSendButton';
import GiftedChatLoadEarlierButton from '../components/3rd_party/GiftedChatLoadEarlierButton';
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
  static navigationOptions = ({ navigation }) => {
    let { title } = navigation.state.params;
    return {
      title,
      drawerLockMode: 'locked-closed'
    };
  }

  constructor(props) {
    super(props);

    let { userId } = this.props.navigation.state.params;
    this.userId = userId;
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.fetchPmList();
    // Fetch new private messages every 1 mins.
    this.timer = setInterval(() => { this.fetchPmList(); }, 1000 * 60);
  }

  componentWillUnmount() {
    this.props.resetPmList();
    // Tear down timer.
    this.timer && clearInterval(this.timer);
  }

  fetchPmList() {
    this.props.fetchPmList({
      userId: this.userId,
      page: 1
    });
  }

  setUpTitle(newUserName) {
    let userName = this.props.pmList.user.name;
    if (userName !== newUserName) {
      this.props.navigation.setParams({ title: newUserName });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setUpTitle(nextProps.pmList.user.name);

    // Handle private messages.
    let {
      send,
      pmList
    } = nextProps;

    if (send.isPublishing) { return; }

    if (pmList.isRefreshing)　{ return; }

    if (send.response) {
      let { rs, errcode } = send.response;

      if (rs) {
        // This is workaround to fix #14.
        // In produciton, sometimes the new sent message can not be displayed
        // in bubble list even it has been sent successfully, but it's very
        // hard to be reproduced in development mode. As we know, JavaScript
        // thread performance suffers greatly when running in development mode,
        // so the workaround can not only fix the weird issue here, but also can
        // give user a better ux with customized ticks `发送中...`, which seems
        // like the best solustion now.
        setTimeout(() => { this.fetchPmList(); }, 1000 * 3);
      } else if (errcode) {
        // The time between sending two messages is too short.
        this.fetchPmList();
        AlertIOS.alert('提示', send.response.errcode);
      } else {
        // No network.
        this.setState(previousState => {
          return {
            messages: previousState.messages.filter(message => !message.isNew)
          };
        });
      }

      this.props.resetPublish();
      return;
    }

    // Translation from Redux store props to component state.
    if (pmList.response && pmList.response.rs) {
      this.setState({
        messages: pmList.list
      });
      this.props.resetPmListResponseStatus();
    }
  }

  loadEarlierMessages(page) {
    this.props.fetchPmList({
      userId: this.userId,
      page
    });
  }

  onSend({ messages, toUserId }) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, Object.assign({}, messages[0], { isNew: true }))
      };
    });

    this.props.submit({
      newMessage: messages[0],
      toUserId
    });
  }

  render() {
    let {
      navigation,
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
        <GiftedChat
          style={mainStyles.container}
          locale={'zh-cn'}
          placeholder='请输入私信内容'
          sendButtonLabel='发送'
          loadEarlierLabel='点击加载较早的消息'
          isLoadingEarlier={isRefreshing && page > 1}
          loadEarlier={hasPrev}
          renderAvatarOnTop={true}
          onLoadEarlier={() => this.loadEarlierMessages(page + 1)}
          onSend={messages => this.onSend({
            messages,
            toUserId: user.id
          })}
          renderSend={props => <GiftedChatSendButton {...props} />}
          renderLoadEarlier={props => <GiftedChatLoadEarlierButton {...props} />}
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
