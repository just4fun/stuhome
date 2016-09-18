import React, { Component } from 'react';
import {
  View
} from 'react-native';
import styles from '../styles/components/_Menu';
import LoginModal from './modal/LoginModal';
import MenuItem from './MenuItem';
import MenuProfile from './MenuProfile';

class Menu extends Component {
  render() {
    this.router = this.props.router;
    let user = this.props.entity.user;
    let authrization = user.authrization;

    return (
      <View style={styles.container}>
        <LoginModal
          ref={component => this._loginModal = component}
          {...this.props}
          visible={false}
          user={user} />
        <MenuProfile authrization={authrization} loginModal={this._loginModal} {...this.props} />
        <MenuItem menu='home' router={this.router} />
        <MenuItem menu='forumList' router={this.router} />
      </View>
    );
  }
}

module.exports = Menu;
