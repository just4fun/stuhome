import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image,
  AsyncStorage,
  ActionSheetIOS
} from 'react-native';
import { userLogout } from '../actions/authorizeAction';
import Dimensions from 'Dimensions';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');
const DEFAULT_AVATAR = 'http://facebook.github.io/react/img/logo_og.png';

const BUTTONS = [
  '注销',
  '取消'
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 30,
    paddingBottom: 15
  },
  avatar: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
  }
});

export default class Menu extends Component {
  _navigateTo(route) {
    this.context.menuActions.close();
    this.props.navigateTo(route);
  }

  _showLogout() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          AsyncStorage.clear()
            .then(() => {
              this.props.dispatch(userLogout());
            }.bind(this));
          break;
      }
    }.bind(this));
  }

  render() {
    const authrization = this.props.entities.user.authrization;
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
                          onPress={() => this._navigateTo({id: 'login', title: '登录'})}>
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
          onPress={() => this._navigateTo({id: 'home', title: '最新'})}>
          <Text style={styles.item}>最新</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.row}
          underlayColor='#ddd'
          onPress={() => this._navigateTo({id: 'forumList', title: '版块'})}>
          <Text style={styles.item}>版块</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
