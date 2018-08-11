import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  AsyncStorage,
  ActionSheetIOS,
} from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import LoginModal from '~/components/LoginModal/LoginModal';
import MenuProfile from '~/components/MenuProfile/MenuProfile';
import MenuItem from '~/components/MenuItem/MenuItem';
import MenuBottomItem from '~/components/MenuBottomItem/MenuBottomItem';
import MENUS from '~/constants/menus';
import {
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache
} from '~/actions/authorizeAction';
import { invalidateTopicList, fetchTopicList } from '~/common/modules/topic/topicList.ducks';
import { getAlertCount } from '~/selectors/alert';

import styles from './Menu.style';

const resetAction = NavigationActions.reset({
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
    AsyncStorage.removeItem('authrization')
                .then(() => {
                  // Remove all cache first.
                  this.props.cleanCache({ isLogin: false });
                  // Back home page.
                  this.props.navigation.dispatch(resetAction);
                });
  }

  render() {
    let {
      user: {
        authrization,
        authrization: { token }
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
          authrization={authrization}
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

function mapStateToProps({ user, alert }) {
  return {
    user,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache,
  invalidateTopicList,
  fetchTopicList
})(Menu);
