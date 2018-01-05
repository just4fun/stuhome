import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import Router from '../router';
import Menu from './Menu';
import Home from '../screens/Home';
import ForumListScreen from './ForumList';
import { getUserFromStorage } from '../actions/authorizeAction';
import { getSettingsFromStorage } from '../actions/settingsAction';
import { fetchAlerts } from '../actions/message/alertAction';
import { PollFrequency } from '../config';

const AppNavigator = DrawerNavigator({
  Home: {
    screen: Home,
  },
  ForumList: {
    screen: ForumListScreen
  }
});

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
})(AppNavigator);
