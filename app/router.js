import { Navigator } from 'react-native';
import Home from './components/Home';
import ForumList from './components/ForumList';
import TopicDetail from './components/TopicDetail';
import ForumDetail from './components/ForumDetail';

let _navigator = null;

class Router {
  constructor(navigator) {
    _navigator = navigator;
  }

  _navigateTo(route) {
    let currentRoute = this.getCurrentRoute();
    if (route.id !== currentRoute.id) {
      _navigator.push(route);
    }
  }

  getCurrentRoute() {
    let routeList = _navigator.getCurrentRoutes();
    let currentRoute = routeList[routeList.length - 1];
    return currentRoute;
  }

  isCurrentRoute(routeId) {
    return routeId === this.getCurrentRoute().id;
  }

  pop() {
    _navigator.pop();
  }

  toHome() {
    this._navigateTo({
      id: 'home',
      title: '最新',
      component: Home
    });
  }

  toForumList() {
    this._navigateTo({
      id: 'forumList',
      title: '版块',
      component: ForumList
    });
  }

  toTopic(topic) {
    this._navigateTo({
      id: 'topicDetail',
      title: topic.board_name,
      component: TopicDetail,
      passProps: topic
    });
  }

  toForum(forum) {
    this._navigateTo({
      /**
      * we should use `forum.board_id` instead of literal text `forumDetail`
      * as id otherwise we can't transition to sub forum from top torum.
      */
      id: forum.board_id,
      title: forum.board_name,
      component: ForumDetail,
      passProps: forum
    });
  }
}

module.exports = Router;
