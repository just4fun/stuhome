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
import { userLogout } from '../actions/authorizeAction';
import SideMenu from 'react-native-side-menu';
import Home from './Home';
import Login from './Login';
import ForumList from './ForumList';

const DEFAULT_AVATAR = 'http://facebook.github.io/react/img/logo_og.png';

const BUTTONS = [
  '注销',
  '取消'
];

export default class Menu extends Component {
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
            .then(() => {
              this.props.dispatch(userLogout());
            }.bind(this));
          break;
      }
    }.bind(this));
  }

  render() {
    this.router = this.props.router;
    const authrization = this.props.entity.user.authrization;
    let avatarComponent = null;

    if (authrization.token) {
      avatarComponent = <TouchableHighlight
                          style={styles.avatar}
                          underlayColor='#ddd'
                          onPress={this._showLogout.bind(this)}>
                          <Image
                           style={styles.avatar}
                           source={{uri: authrization.avatar}}
                          />
                        </TouchableHighlight>;
    } else {
      avatarComponent = <TouchableHighlight
                          style={styles.avatar}
                          underlayColor='#ddd'
                          onPress={() => {
                            this.context.menuActions.close();
                            this.router.toLogin({
                              sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                            })
                          }}>
                          <Image
                           style={styles.avatar}
                           source={{uri: DEFAULT_AVATAR}}
                          />
                        </TouchableHighlight>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.menuHeader}>
          {avatarComponent}
        </View>
        <TouchableHighlight
          style={styles.row}
          underlayColor='#ddd'
          onPress={() => {
            this.context.menuActions.close();
            this.router.toHome();
          }}>
          <Text style={styles.item}>最新</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.row}
          underlayColor='#ddd'
          onPress={() => {
            this.context.menuActions.close();
            this.router.toForumList();
          }}>
          <Text style={styles.item}>版块</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
