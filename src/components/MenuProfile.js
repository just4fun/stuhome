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
                  this.props.cleanCache();
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

    let source = require('../images/noavatar.jpg');
    let action = () => openLoginModal();

    if (token) {
      source = { uri: avatar };
      action = () => this._showLogout();
    }

    return (
      <View style={[styles.menuHeader, !token && styles.menuHeaderNoToken]}>
        <View>
          <TouchableHighlight
            style={styles.avatar}
            underlayColor={colors.underlay}
            onPress={action}>
            <Image
             style={styles.avatar}
             source={source} />
          </TouchableHighlight>
          {token && <Text style={styles.name}>{userName}</Text>}
        </View>
        {token &&
          <View style={styles.infoWrapper}>
            <Text style={[styles.info, styles.level]}>级别：{userTitle}</Text>
            {creditShowList &&
              <View>
                <Text style={styles.info}>{creditShowList[0].title}：{creditShowList[0].data}</Text>
                <Text style={styles.info}>{creditShowList[1].title}：{creditShowList[1].data}</Text>
              </View>
            }
          </View>
        }
      </View>
    );
  }
}
