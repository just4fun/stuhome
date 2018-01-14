import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import Menu from './Menu';
import HomeScreen from './Home';
import ForumListScreen from './ForumList';
import ForumScreen from './ForumDetail';
import SearchScreen from './Search';
import TopicScreen from './TopicDetail';
import MessageScreen from './Message';
import IndividualScreen from './Individual';
import PrivateMessageScreen from './PmList';
import AboutScreen from './About';
import InformationScreen from './Information';
import SettingsScreen from './Settings';
import WebViewScreen from './Browser';
import PublishModalScreen from '../components/modal/PublishModal';
import ReplyModalScreen from '../components/modal/ReplyModal';
import colors from '../styles/common/_colors';
import { getUserFromStorage } from '../actions/authorizeAction';
import { getSettingsFromStorage } from '../actions/settingsAction';
import { fetchAlerts } from '../actions/message/alertAction';
import { PollFrequency } from '../config';

const AppNavigator = DrawerNavigator({
  App: {
    screen: StackNavigator({
      Main: {
        screen: StackNavigator({
          Home: {
            screen: HomeScreen
          },
          ForumList: {
            screen: ForumListScreen
          },
          Forum: {
            screen: ForumScreen
          },
          Search: {
            screen: SearchScreen
          },
          Topic: {
            screen: TopicScreen
          },
          Individual: {
            screen: IndividualScreen
          },
          Message: {
            screen: MessageScreen
          },
          PrivateMessage: {
            screen: PrivateMessageScreen
          },
          WebView: {
            screen: WebViewScreen
          },
          About: {
            screen: AboutScreen
          },
          Information: {
            screen: InformationScreen
          },
          Settings: {
            screen: SettingsScreen
          }
        }, {
          initialRouteName: 'Home',
          navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue
            }
          }
        })
      },
      ReplyModal: {
        screen: ReplyModalScreen
      }
    }, {
      // Without `headerMode: 'none'`, there will be two headers since there are two
      // StackNavigators which is workaround for using both `Card` and `Modal` mode.
      //
      // However, it will also hide header for Modal components, maybe you think why
      // we don't use original custom Header component written with RN Modal, the reason
      // is in that way we need to involve Modal component in every needed place.
      //
      // As workaround, I just used original custom Header component for Modal components.
      //
      // https://github.com/react-navigation/react-navigation/issues/1276
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: 'Main',
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.blue
        }
      }
    })
  },
}, {
  initialRouteName: 'App',
  contentComponent: Menu,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

class AppRoot extends Component {
  componentDidMount() {
    this.props.getUserFromStorage();
  }

  render() {
    return (
      <AppNavigator {...this.props} />
    );
  }
}

// class RNavigator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: false
//     };
//   }

//   componentDidMount() {
//     MessageBarManager.registerMessageBar(this.refs.alert);

//     this.props.getUserFromStorage();
//     this.props.getSettingsFromStorage();
//   }

//   componentWillReceiveProps(nextProps) {
//     let currentToken = this.props.user.authrization.token;
//     let nextToken = nextProps.user.authrization.token;

//     let currentEnableNotification = this.props.settings.enableNotification;
//     let nextEnableNotification = nextProps.settings.enableNotification;

//     if (currentToken === nextToken && currentEnableNotification === nextEnableNotification) { return; }

//     if (!nextToken || !nextEnableNotification) {
//       this.timer && clearInterval(this.timer);
//       // `clearInterval` will not remove the value of `this.timer`,
//       // we need to remove it manually for the next if condition.
//       this.timer = null;
//       return;
//     }

//     if (!this.timer && nextEnableNotification) {
//       this.timer = setInterval(() => { this._fetchAlerts(); }, 1000 * PollFrequency);
//     }
//   }

//   componentWillUnmount() {
//     MessageBarManager.unregisterMessageBar();
//     this.timer && clearInterval(this.timer);
//   }

//   _fetchAlerts() {
//     this.props.fetchAlerts();
//   }

//   configureScene(route) {
//     if (route.sceneConfig) {
//       return route.sceneConfig;
//     }

//     return Navigator.SceneConfigs.FloatFromRight;
//   }

//   renderScene(route, navigator) {
//     if (!this.router) {
//       this.router = new Router(navigator);
//     }

//     return <route.component
//              router={this.router}
//              updateMenuState={isOpen => this._updateMenuState(isOpen)}
//              passProps={route.passProps} />;
//   }

//   _updateMenuState(isOpen) {
//     this.setState({ isOpen });
//   }

//   _onMenuItemSelected(item, isForceReplace) {
//     this._updateMenuState(false);
//     this.router[item.actionName](isForceReplace);
//   }

//   _isCurrentRoute(route) {
//     return this.router && this.router.isCurrentRoute(route.id);
//   }

//   render() {
//     let menu = <Menu
//                  router={this.router}
//                  selectMenuItem={(item, isForceReplace) => this._onMenuItemSelected(item, isForceReplace)}
//                  isCurrentRoute={route => this._isCurrentRoute(route)} />;

//     return (
//       <SideMenu
//         menu={menu}
//         disableGestures={true}
//         isOpen={this.state.isOpen}>
//         <Navigator
//           ref='navigator'
//           configureScene={this.configureScene}
//           renderScene={this.renderScene.bind(this)}
//           initialRoute={{
//             id: 'home',
//             title: '首页',
//             component: Home
//           }} />
//         <MessageBar ref="alert" />
//       </SideMenu>
//     );
//   }
// }

function mapStateToProps({ user, settings }) {
  return {
    user,
    settings
  };
}

export default connect(mapStateToProps, {
  getUserFromStorage,
  getSettingsFromStorage,
  fetchAlerts
})(AppRoot);
