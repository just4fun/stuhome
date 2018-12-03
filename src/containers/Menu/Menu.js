import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  AsyncStorage,
  ActionSheetIOS,
} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import MenuProfile from '~/components/MenuProfile/MenuProfile';
import MenuItem from '~/components/MenuItem/MenuItem';
import MenuBottomItem from '~/components/MenuBottomItem/MenuBottomItem';
import MENUS from '~/constants/menus';
import {
  login,
  resetSession,
  resetSessionResult,
  logout
} from '~/modules/user/session/session.ducks';
import { invalidateTopicList, fetchTopicList } from '~/modules/topic/topicList/topicList.ducks';
import { getAlertCount } from '~/modules/message/alert/alert.selectors';

import styles from './Menu.style';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' })
  ]
});

class Menu extends Component {
  showLogoutDialog() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '确认退出',
        '取消'
      ],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.handleLogout();
          break;
      }
    });
  }

  handleLogout() {
    AsyncStorage.removeItem('session')
                .then(() => {
                  // Remove all cache first.
                  this.props.logout({ isLogin: false });
                  // Back home page.
                  this.props.navigation.dispatch(resetAction);
                });
  }

  render() {
    const {
      session: {
        data,
        data: { token }
      },
      alertCount
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={styles.container}>
        <Image
          source={require('~/images/shahe.jpg')}
          style={styles.blur} />
        <MenuProfile
          {...this.props} />
        <View style={styles.menus}>
          {token &&
            <View>
              <MenuItem
                menu={MENUS['forumList']}
                {...this.props} />
              <MenuItem
                menu={MENUS['search']}
                {...this.props} />
              <MenuItem
                showAlert={true}
                alertCount={alertCount}
                menu={MENUS['message']}
                {...this.props} />
              <MenuItem
                menu={MENUS['individual']}
                {...this.props} />
            </View>
          }
          <MenuItem
            menu={MENUS['about']}
            {...this.props} />
        </View>
        {token &&
          <View style={styles.menuFooter}>
            <MenuBottomItem
              menu={MENUS['settings']}
              style={styles.menuBottomItemWrapper}
              rowStyle={styles.menuBottomSettings}
              {...this.props} />
            <MenuBottomItem
              menu={MENUS['logout']}
              style={styles.menuBottomItemWrapper}
              rowStyle={styles.menuBottomLogout}
              onPress={() => this.showLogoutDialog()} />
          </View>
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ session, alert }) {
  return {
    session,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  login,
  resetSession,
  resetSessionResult,
  logout,
  invalidateTopicList,
  fetchTopicList
})(Menu);
