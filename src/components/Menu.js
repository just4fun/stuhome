import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles/components/_Menu';
import LoginModal from './modal/LoginModal';
import MenuProfile from './MenuProfile';
import MenuItem from './MenuItem';

export default class Menu extends Component {
  render() {
    let {
      user: { authrization },

      selectMenuItem,
      isCurrentRoute
    } = this.props;

    return (
      <View style={styles.container}>
        <LoginModal
          ref={component => this._loginModal = component}
          visible={false}
          {...this.props} />
        <MenuProfile authrization={authrization} loginModal={this._loginModal} {...this.props} />
        <MenuItem
          menu='home'
          selectMenuItem={selectMenuItem}
          isCurrentRoute={isCurrentRoute} />
        <MenuItem
          menu='forumList'
          selectMenuItem={selectMenuItem}
          isCurrentRoute={isCurrentRoute} />
      </View>
    );
  }
}
