import React, {
  View,
  Text,
  Component,
  Navigator
} from 'react-native';
import styles from '../styles/components/_Main';
import Router from '../router';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Home from './Home';
import Header from './Header';
import { getUserFromStorage } from '../actions/authorizeAction';

export default class Main extends Component {
  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }

    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    this.router = this.router || new Router(navigator);

    return (
      <View style={styles.container}>
        <Header title={route.title} />
        <route.component {...this.props} router={this.router} />
      </View>
    );
  }

  render() {
    const menu = <Menu {...this.props} router={this.router} />

    return (
      <SideMenu
        menu={menu}
        touchToClose={true}>
        <Navigator
          initialRoute={{
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
