import React, { Component } from 'react';
import AppState from 'AppState';
import { View, Navigator } from 'react-native';
import CodePush from 'react-native-code-push';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import SideMenu from 'react-native-side-menu';
import Router from '../router';
import Menu from './Menu';
import Home from './Home';

export default class RNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    // hot push
    AppState.addEventListener('change', this.handleAppStateChange);

    MessageBarManager.registerMessageBar(this.refs.alert);

    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    MessageBarManager.unregisterMessageBar();
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
    }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }

    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    if (!this.router) {
      this.router = new Router(navigator);
    }

    return <route.component
             router={this.router}
             updateMenuState={isOpen => this._updateMenuState(isOpen)}
             passProps={route.passProps} />;
  }

  _updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  _onMenuItemSelected(item, isForceReplace) {
    this._updateMenuState(false);
    this.router[item.actionName](isForceReplace);
  }

  _isCurrentRoute(route) {
    return this.router && this.router.isCurrentRoute(route.id);
  }

  render() {
    let menu = <Menu
                 selectMenuItem={(item, isForceReplace) => this._onMenuItemSelected(item, isForceReplace)}
                 isCurrentRoute={route => this._isCurrentRoute(route)} />;

    return (
      <SideMenu
        menu={menu}
        disableGestures={true}
        isOpen={this.state.isOpen}>
        <Navigator
          ref='navigator'
          configureScene={this.configureScene}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            id: 'home',
            title: '首页',
            component: Home
          }} />
        <MessageBar ref="alert" />
      </SideMenu>
    );
  }
}
