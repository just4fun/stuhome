import { Navigator } from 'react-native';
import Home from './components/Home';
import Login from './components/Login';
import ForumList from './components/ForumList';


export default class Router {
  constructor(navigator) {
    this.navigator = navigator;
  }

  _navigateTo(route) {
    let routeList = this.navigator.getCurrentRoutes();
    let currentRoute = routeList[routeList.length - 1];
    if (route.title !== currentRoute.title) {
      this.navigator.push(route);
    }
  }

  popToHome() {
    this.navigator.popToTop();
  }

  toHome() {
    this._navigateTo({
      title: '最新',
      component: Home
    });
  }

  toLogin(config) {
    this._navigateTo({
      title: '登录',
      component: Login,
      sceneConfig: config.sceneConfig
    });
  }

  toForumList() {
    this._navigateTo({
      title: '版块',
      component: ForumList
    });
  }
}
