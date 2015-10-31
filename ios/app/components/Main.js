import React, {
  View,
  Text,
  Component,
  Navigator,
  StyleSheet
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Login from './Login';
import Home from './Home';
import ForumList from './ForumList';
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
    let mainComponent;

    switch (route.id) {
      case 'login':
        mainComponent = <Login {...this.props} navigator={navigator} />;
        break;
      case 'home':
        mainComponent = <Home {...this.props} />;
        break;
      case 'forumList':
        mainComponent = <ForumList {...this.props} />;
        break;
    }

    return (
      <View style={styles.container}>
        <Header title={route.title}/>
        {mainComponent}
      </View>
    );
  }

  navigateTo(route, isLogin) {
    let navigator = this.refs.navigator;
    let routeList = navigator.getCurrentRoutes();
    let currentRoute = routeList[routeList.length - 1];
    if (route.id !== currentRoute.id) {
      this.refs.navigator.push(route);
    }
  }

  render() {
    const menu = <Menu {...this.props} navigateTo={this.navigateTo.bind(this)} />

    return (
      <SideMenu
        menu={menu}
        touchToClose={true}>
        <Navigator
          initialRoute={{id: 'home', title: '最新'}}
          configureScene={this.configureScene}
          renderScene={this.renderScene.bind(this)}
          ref='navigator' />
      </SideMenu>
    );
  }
}
