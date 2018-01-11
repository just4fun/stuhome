import { Navigator } from 'react-native';
import Home from './containers/Home';
import ForumList from './containers/ForumList';
import TopicDetail from './containers/TopicDetail';
import ForumDetail from './containers/ForumDetail';
import Search from './containers/Search';
import Browser from './containers/Browser';
import Message from './containers/Message';
import Individual from './containers/Individual';
import About from './containers/About';
import PmList from './containers/PmList';
import Settings from './containers/Settings';
import Information from './containers/Information';

let _navigator = null;

export default class Router {
  // constructor(navigator) {
  //   _navigator = navigator;
  // }

  // _navigateTo(route, isReplace, isForceReplace) {
  //   // This case is that if we are in Home page and
  //   // we want to login or logout, we need to replace
  //   // Home page as well since we want to fetch topic
  //   // list again with or without authrization.
  //   //
  //   // The second case is that we publish topic from
  //   // home page, then we want to fetch topic list again
  //   // to see the new topic.
  //   if (isForceReplace) {
  //     _navigator.replace(route);
  //     return;
  //   }

  //   let currentRoute = this.getCurrentRoute();

  //   if (route.id !== currentRoute.id
  //       // We could navigate to another topic via a url within a topic.
  //       || (route.id === 'topicDetail' && (route.passProps.currentTopicId !== +route.passProps.topic_id))
  //       // We could navigate to another user's personal page even we are in someone's personal page.
  //       || (route.id === 'individual' && (route.passProps.currentUserId !== +route.passProps.userId))
  //       ) {
  //     if (isReplace) {
  //       _navigator.replace(route);
  //       return;
  //     }

  //     _navigator.push(route);
  //   }
  // }

  // getCurrentRoute() {
  //   let routeList = _navigator.getCurrentRoutes();
  //   let currentRoute = routeList[routeList.length - 1];
  //   return currentRoute;
  // }

  // pop() {
  //   _navigator.pop();
  // }

  // toHome(isForceReplace) {
  //   this._navigateTo({
  //     id: 'home',
  //     title: '首页',
  //     component: Home
  //   }, true, isForceReplace);
  // }

  // toForumList() {
  //   this._navigateTo({
  //     id: 'forumList',
  //     title: '版块',
  //     component: ForumList
  //   }, true);
  // }

  // toSearch() {
  //   this._navigateTo({
  //     id: 'search',
  //     title: '搜索',
  //     component: Search
  //   }, true);
  // }

  // toTopic(topic) {
  //   this._navigateTo({
  //     id: 'topicDetail',
  //     title: topic.board_name,
  //     component: TopicDetail,
  //     passProps: topic
  //   });
  // }

  // toForum(forum) {
  //   this._navigateTo({
  //     /**
  //     * we should use `forum.board_id` instead of literal text `forumDetail`
  //     * as id otherwise we can't transition to sub forum from top torum.
  //     */
  //     id: forum.board_id,
  //     title: forum.board_name,
  //     component: ForumDetail,
  //     passProps: forum
  //   });
  // }

  // toBrowser(url, title) {
  //   this._navigateTo({
  //     id: 'WebView',
  //     component: Browser,
  //     passProps: { url, title }
  //   });
  // }

  // toMessage() {
  //   this._navigateTo({
  //     id: 'message',
  //     title: '消息',
  //     component: Message
  //   }, true);
  // }

  // toIndividual(user) {
  //   this._navigateTo({
  //     id: 'individual',
  //     title: '个人',
  //     component: Individual,
  //     passProps: user
  //   }, !user);
  // }

  // toAbout() {
  //   this._navigateTo({
  //     id: 'about',
  //     title: '关于',
  //     component: About
  //   }, true);
  // }

  // toPmList(userId) {
  //   this._navigateTo({
  //     id: 'pmList',
  //     title: '私信',
  //     component: PmList,
  //     passProps: userId
  //   });
  // }

  // toSettings() {
  //   this._navigateTo({
  //     id: 'settings',
  //     title: '设置',
  //     component: Settings
  //   });
  // }

  // toInformation() {
  //   this._navigateTo({
  //     id: 'information',
  //     title: '资料',
  //     component: Information
  //   });
  // }
}
