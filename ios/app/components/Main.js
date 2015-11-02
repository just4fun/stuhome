import React, {
  View,
  Text,
  Component,
  Navigator,
  StyleSheet
} from 'react-native';
import Router from '../router';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Home from './Home';
import Header from './Header';
import Dimensions from 'Dimensions';
import { getUserFromStorage } from '../actions/authorizeAction';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    backgroundColor: '#F5F5F5'
  }
});

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
