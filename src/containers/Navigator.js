import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigator } from 'react-native';
import SideMenu from 'react-native-side-menu';
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
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

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

    return <route.component
             router={this.router}
             updateMenuState={isOpen => this._updateMenuState(isOpen)}
             passProps={route.passProps} />;
  }

  _updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    let menu = <Menu
                 {...this.props}
                 router={this.router}
                 updateMenuState={isOpen => this._updateMenuState(isOpen)} />;

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
