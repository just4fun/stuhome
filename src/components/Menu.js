import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles/components/_Menu';
import LoginModal from './modal/LoginModal';
import MenuProfile from './MenuProfile';
import MenuItem from './MenuItem';

export default class Menu extends Component {
  render() {
    let {
      router,
      user: { authrization },

      updateMenuState
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
          router={router}
          updateMenuState={updateMenuState} />
        <MenuItem
          menu='forumList'
          router={router}
          updateMenuState={updateMenuState} />
      </View>
    );
  }
}
