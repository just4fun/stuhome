import React, { Component } from 'react';
import {
  View,
  Image,
  AsyncStorage,
  ActionSheetIOS,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/components/_MenuProfile';
import colors from '../styles/common/_colors';

class MenuProfile extends Component {
  _showLogout() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '注销',
        '取消'
      ],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          AsyncStorage.removeItem('authrization')
            .then(() => this.props.userLogout());
          break;
      }
    });
  }

  render() {
    let { authrization, loginModal } = this.props;
    let source = require('../images/noavatar.jpg');
    let action = () => loginModal._openLoginModal();

    if (authrization.token) {
      source = { uri: authrization.avatar };
      action = () => this._showLogout();
    }

    return (
      <View style={styles.menuHeader}>
        <TouchableHighlight
          style={styles.avatar}
          underlayColor={colors.underlay}
          onPress={action}>
          <Image
           style={styles.avatar}
           source={source} />
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = MenuProfile;
