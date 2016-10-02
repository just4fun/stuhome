import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigator } from 'react-native';
import SideMenu from '../vendor/react-native-side-menu';
import Router from '../router';
import Menu from '../components/Menu';
import Home from './Home';
import {
  getUserFromStorage,
  userLogin,
  userLogout,
  resetAuthrization,
  resetAuthrizationResult
} from '../actions/authorizeAction';

class RNavigator extends Component {
  componentWillMount() {
    this.props.getUserFromStorage();
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

    return <route.component router={this.router} passProps={route.passProps} />;
  }

  render() {
    let menu = <Menu {...this.props} router={this.router} />;

    return (
      <SideMenu
        menu={menu}
        touchToClose={true}>
        <Navigator
          ref='navigator'
          configureScene={this.configureScene}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            id: 'home',
            title: '最新',
            component: Home
          }} />
      </SideMenu>
    );
  }
}

function mapStateToProps(state) {
  let { user } = state;

  return {
    user
  };
}

export default connect(mapStateToProps, {
  getUserFromStorage,
  userLogin,
  userLogout,
  resetAuthrization,
  resetAuthrizationResult
})(RNavigator);
