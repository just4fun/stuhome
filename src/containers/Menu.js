import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styles from '../styles/containers/_Menu';
import LoginModal from '../components/modal/LoginModal';
import MenuProfile from '../components/MenuProfile';
import MenuItem from '../components/MenuItem';
import {
  getUserFromStorage,
  userLogin,
  userLogout,
  resetAuthrization,
  resetAuthrizationResult
} from '../actions/authorizeAction';

class Menu extends Component {
  componentDidMount() {
    this.props.getUserFromStorage();
  }

  render() {
    let { user } = this.props;

    return (
      <View style={styles.container}>
        <LoginModal
          ref={component => this._loginModal = component}
          visible={false}
          {...this.props} />
        <MenuProfile
          authrization={user.authrization}
          loginModal={this._loginModal}
          {...this.props} />
        <MenuItem
          menu='home'
          {...this.props} />
        <MenuItem
          menu='forumList'
          {...this.props} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { user } = state;

  return {
    user
  };
}

export default connect(mapStateToProps, {
  getUserFromStorage,
  userLogin,
  userLogout,
  resetAuthrization,
  resetAuthrizationResult
})(Menu);
