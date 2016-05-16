import React, {
  View,
  Text,
  Component,
  Navigator
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Router from '../router';
import Menu from './Menu';
import Home from './Home';
import { getUserFromStorage } from '../actions/authorizeAction';
import { changeRoute } from '../actions/routeAction';

class Main extends Component {
  componentDidMount() {
    this.props.dispatch(getUserFromStorage());
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

      // indicate the current route in side menu
      navigator.navigationContext.addListener('didfocus', e => {
        let route = e.data.route;
        this.props.dispatch(changeRoute(route));
      });
    }

    return <route.component {...this.props} router={this.router} passProps={route.passProps} />;
  }

  render() {
    const menu = <Menu {...this.props} router={this.router} />;

    return (
      <SideMenu
        menu={menu}
        touchToClose={true}>
        <Navigator
          initialRoute={{
            id: 'home',
            title: '最新',
            component: Home
          }}
          configureScene={this.configureScene}
          renderScene={this.renderScene.bind(this)}
          ref='navigator' />
      </SideMenu>
    );
  }
}

module.exports = Main;
