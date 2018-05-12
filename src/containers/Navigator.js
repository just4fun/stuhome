import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { DrawerNavigator, StackNavigator, SafeAreaView } from 'react-navigation';
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
import WebPageScreen from './WebPage';
import LoginModalScreen from '../components/modal/LoginModal';
import RegisterModalScreen from '../components/modal/RegisterModal';
import PublishModalScreen from '../components/modal/PublishModal';
import ReplyModalScreen from '../components/modal/ReplyModal';
import ForumListModalScreen from '../components/modal/ForumListModal';
import FriendListModalScreen from '../components/modal/FriendListModal';
import colors from '../styles/common/_colors';
import { getUserFromStorage } from '../actions/authorizeAction';
import { getSettingsFromStorage } from '../actions/settingsAction';
import { fetchAlerts } from '../actions/message/alertAction';
import { ALERT_POLL_FREQUENCY } from '../config';

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
          WebPage: {
            screen: WebPageScreen
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
            },
            headerTruncatedBackTitle: '返回',
            drawerLockMode: 'locked-closed'
          }
        })
      },
      LoginModal: {
        screen: LoginModalScreen
      },
      RegisterModal: {
        screen: RegisterModalScreen
      },
      PublishModal: {
        screen: PublishModalScreen
      },
      ReplyModal: {
        screen: ReplyModalScreen
      },
      ForumListModal: {
        screen: ForumListModalScreen
      },
      FriendListModal: {
        screen: FriendListModalScreen
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
        },
        drawerLockMode: 'locked-closed'
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
    MessageBarManager.registerMessageBar(this.refs.alert);

    this.props.getUserFromStorage();
    this.props.getSettingsFromStorage();
  }

  componentWillReceiveProps(nextProps) {
    let currentToken = this.props.user.authrization.token;
    let nextToken = nextProps.user.authrization.token;

    let currentEnableNotification = this.props.settings.enableNotification;
    let nextEnableNotification = nextProps.settings.enableNotification;

    if (currentToken === nextToken && currentEnableNotification === nextEnableNotification) { return; }

    if (!nextToken || !nextEnableNotification) {
      this.timer && clearInterval(this.timer);
      // `clearInterval` will not remove the value of `this.timer`,
      // we need to remove it manually for the next if condition.
      this.timer = null;
      return;
    }

    if (!this.timer && nextEnableNotification) {
      this.timer = setInterval(() => { this.fetchAlerts(); }, 1000 * ALERT_POLL_FREQUENCY);
    }
  }

  fetchAlerts() {
    this.props.fetchAlerts();
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={{ flex: 1, backgroundColor: colors.blue }}>
        <AppNavigator {...this.props} />
        <MessageBar ref="alert" />
      </SafeAreaView>
    );
  }
}

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
