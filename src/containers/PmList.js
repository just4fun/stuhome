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
  fetchPmList,
  resetPmList
} from '../actions/message/pmListAction';
import mainStyles from '../styles/components/_Main';

const LOGIN_USER_ID = 9527;

class PmList extends Component {
  constructor(props) {
    super(props);

    this.userId = this.props.passProps.userId;
  }

  componentDidMount() {
    this.props.fetchPmList({ userId: this.userId });
  }

  componentWillUnmount() {
    this.props.resetPmList();
  }

  render() {
    let {
      router,
      pmList: {
        list,
        user
      }
    } = this.props;
    let messages = list.map(item => {
      return {
        _id: item.mid,
        text: item.content,
        user: {
          _id: (item.sender === user.id) && item.sender || LOGIN_USER_ID,
          avatar: (item.sender === user.id) && user.avatar
        }
      };
    })

    return (
      <View style={mainStyles.container}>
        <Header title={user.name}>
          <PopButton router={router} />
        </Header>
        <GiftedChat
          style={mainStyles.container}
          renderAvatarOnTop={true}
          messages={messages}
          user={{ _id: LOGIN_USER_ID }}/>
      </View>
    );
  }
}

function mapStateToProps({ pmList }) {
  return {
    pmList
  };
}

export default connect(mapStateToProps, {
  fetchPmList,
  resetPmList
})(PmList);
