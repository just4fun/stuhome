import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  AsyncStorage,
  ActionSheetIOS
} from 'react-native';
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
                  // remove all cache first
                  this.props.cleanCache({ isLogin: false });
                  this.props.navigation.navigate('Home');
                });
  }

  render() {
    let { user, alertCount } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={require('../images/shahe.jpg')}
          style={styles.blur} />
        {
        // isLoginModalOpen &&
        //   <LoginModal
        //     visible={isLoginModalOpen}
        //     menus={menus}
        //     closeLoginModal={() => this.toggleLoginModal(false)}
        //     {...this.props} />
        }
        <MenuProfile
          authrization={user.authrization}
          {...this.props} />
        <View style={styles.menus}>
          <MenuItem
            menu={menus['forumList']}
            {...this.props} />
          {user.authrization.token &&
            <View>
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
        {user.authrization.token &&
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
      </View>
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
