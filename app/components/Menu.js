import React, {
  Component,
  TouchableHighlight,
  View,
  Text,
  Image,
  AsyncStorage,
  ActionSheetIOS,
  Navigator
} from 'react-native';
import styles from '../styles/components/_Menu';
import colors from '../styles/common/_colors';
import LoginModal from './modal/LoginModal';
import Home from './Home';
import ForumList from './ForumList';
import { userLogout } from '../actions/authorizeAction';

const DEFAULT_AVATAR = 'http://facebook.github.io/react/img/logo_og.png';

const BUTTONS = [
  '注销',
  '取消'
];

class Menu extends Component {
  _showLogout() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          AsyncStorage.removeItem('authrization')
            .then(() => this.props.dispatch(userLogout()));
          break;
      }
    });
  }

  _isCurrentRoute(routeId) {
    return this.router && this.router.isCurrentRoute(routeId);
  }

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

        <View style={styles.menuHeader}>
          {authrization.token &&
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => this._showLogout()}>
              <Image
               style={styles.avatar}
               source={{ uri: authrization.avatar }} />
            </TouchableHighlight>
            ||
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => this._loginModal._openLoginModal()}>
              <Image
               style={styles.avatar}
               source={{ uri: DEFAULT_AVATAR }} />
            </TouchableHighlight>
          }
        </View>
        <TouchableHighlight
          style={[styles.row, this._isCurrentRoute('home') && styles.selectedRow]}
          underlayColor={colors.underlay}
          onPress={() => {
            this.context.menuActions.close();
            this.router.toHome();
          }}>
          <Text style={[styles.item, this._isCurrentRoute('home') && styles.selectedItem]}>最新</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.row, this._isCurrentRoute('forumList') && styles.selectedRow]}
          underlayColor={colors.underlay}
          onPress={() => {
            this.context.menuActions.close();
            this.router.toForumList();
          }}>
          <Text style={[styles.item, this._isCurrentRoute('forumList') && styles.selectedItem]}>版块</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

module.exports = Menu;
