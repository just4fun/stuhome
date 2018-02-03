import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  AsyncStorage,
  ActionSheetIOS,
  SafeAreaView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/containers/_Menu';
import LoginModal from '../components/modal/LoginModal';
import MenuProfile from '../components/MenuProfile';
import MenuItem from '../components/MenuItem';
import MenuBottomItem from '../components/MenuBottomItem';
import {
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache
} from '../actions/authorizeAction';
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';
import menus from '../constants/menus';
import { getAlertCount } from '../selectors/alert';

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
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../images/shahe.jpg')}
          style={styles.blur} />
        <MenuProfile
          authrization={authrization}
          {...this.props} />
        <View style={styles.menus}>
          {token &&
            <View>
              <MenuItem
                menu={menus['forumList']}
                {...this.props} />
              <MenuItem
                menu={menus['search']}
                {...this.props} />
              <MenuItem
                showAlert={true}
                alertCount={alertCount}
                menu={menus['message']}
                {...this.props} />
              <MenuItem
                menu={menus['individual']}
                {...this.props} />
            </View>
          }
          <MenuItem
            menu={menus['about']}
            {...this.props} />
        </View>
        {token &&
          <View style={styles.menuFooter}>
            <MenuBottomItem
              menu={menus['settings']}
              style={styles.menuBottomItemWrapper}
              rowStyle={styles.menuBottomSettings}
              {...this.props} />
            <MenuBottomItem
              menu={menus['logout']}
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
