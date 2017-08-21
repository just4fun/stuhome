import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  ActionSheetIOS,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/components/_MenuProfile';
import colors from '../styles/common/_colors';

export default class MenuProfile extends Component {
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
          this._handleLogout();
          break;
      }
    });
  }

  _handleLogout() {
    AsyncStorage.removeItem('authrization')
                .then(() => {
                  // remove all cache first
                  this.props.cleanCache({ isLogin: false });
                  // force replace Home route
                  this.props.selectMenuItem(this.props.menus['home'], true);
                });
  }

  render() {
    let { authrization, openLoginModal } = this.props;
    let {
      token,
      avatar,
      userName,
      userTitle,
      creditShowList
    } = authrization;

    return (
      <View style={styles.menuHeader}>
        <View>
          {token &&
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => this._showLogout()}>
              <Image
               key={avatar}
               style={styles.avatar}
               source={{ uri: avatar }} />
             </TouchableHighlight>
            ||
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => openLoginModal()}>
              <Image
               key='noavatar'
               style={styles.avatar}
               source={require('../images/noavatar.jpg')} />
             </TouchableHighlight>
          }
          <Text style={styles.name}>{token ? userName : '请先登录'}</Text>
        </View>
      </View>
    );
  }
}
