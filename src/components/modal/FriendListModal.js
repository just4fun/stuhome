import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import FriendList from '../FriendList';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import Header from '../Header';
import { invalidateFriendList, fetchFriendList } from '../../actions/user/friendListAction';

class FriendListModal extends Component {
  constructor(props) {
    super(props);
    this.title = '选择好友';
  }

  componentDidMount() {
    this.fetchFriendList();
  }

  fetchFriendList(options = {}) {
    this.props.fetchFriendList(options);
  }

  refreshFriendList(options) {
    this.props.invalidateFriendList();
    this.fetchFriendList(options);
  }

  handleSelectFriend(friend) {
    // Invoke callback to set @friend in TextInput.
    this.props.navigation.state.params.callback(friend);
    // Close modal.
    this.props.navigation.goBack();
  }

  render() {
    let { friendList, navigation } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header title={this.title}>
          <Text
            style={modalStyles.button}
            onPress={() => this.handleSelectFriend()}>取消</Text>
        </Header>
        <FriendList
          friendList={friendList}
          handleSelectFriend={(friend) => this.handleSelectFriend(friend)}
          refreshFriendList={(options) => this.refreshFriendList(options)} />
      </View>
    );
  }
}

function mapStateToProps({ friendList }) {
  return {
    friendList
  };
}

export default connect(mapStateToProps, {
  invalidateFriendList,
  fetchFriendList
})(FriendListModal);
