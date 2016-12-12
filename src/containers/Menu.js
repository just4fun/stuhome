import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styles from '../styles/containers/_Menu';
import LoginModal from '../components/modal/LoginModal';
import MenuProfile from '../components/MenuProfile';
import MenuItem from '../components/MenuItem';
import {
  getUserFromStorage,
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache
} from '../actions/authorizeAction';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

const menus = {
  home: {
    id: 'home',
    title: '最新',
    icon: 'commenting',
    actionName: 'toHome'
  },

  forumList: {
    id: 'forumList',
    title: '版块',
    icon: 'comments',
    actionName: 'toForumList'
  },

  search: {
    id: 'search',
    title: '搜索',
    icon: 'search',
    actionName: 'toSearch'
  },

  message: {
    id: 'message',
    title: '消息',
    icon: 'at',
    actionName: 'toMessage'
  }
};

class Menu extends Component {
  componentDidMount() {
    this.props.getUserFromStorage();
  }

  cleanCache() {
    this.props.cleanCache();
  }

  render() {
    let { user } = this.props;

    return (
      <View style={styles.container}>
        <LoginModal
          ref={component => this._loginModal = component}
          visible={false}
          menus={menus}
          cleanCache={() => this.cleanCache()}
          {...this.props} />
        <MenuProfile
          authrization={user.authrization}
          loginModal={this._loginModal}
          menus={menus}
          cleanCache={() => this.cleanCache()}
          {...this.props} />
        <MenuItem
          menu={menus['home']}
          {...this.props} />
        <MenuItem
          menu={menus['forumList']}
          {...this.props} />
        {user.authrization.token &&
          <View>
            <MenuItem
              menu={menus['search']}
              {...this.props} />
            <MenuItem
              menu={menus['message']}
              {...this.props} />
          </View>
        }
      </View>
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
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache,
  invalidateTopicList,
  fetchTopicListIfNeeded
})(Menu);
