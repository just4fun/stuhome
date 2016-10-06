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
  userLogout,
  resetAuthrization,
  resetAuthrizationResult
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
  }
};

class Menu extends Component {
  componentDidMount() {
    this.props.getUserFromStorage();
  }

  render() {
    let { user } = this.props;

    return (
      <View style={styles.container}>
        <LoginModal
          ref={component => this._loginModal = component}
          visible={false}
          {...this.props} />
        <MenuProfile
          authrization={user.authrization}
          loginModal={this._loginModal}
          menus={menus}
          {...this.props} />
        <MenuItem
          menu={menus['home']}
          {...this.props} />
        <MenuItem
          menu={menus['forumList']}
          {...this.props} />
        {user.authrization.token &&
          <MenuItem
          menu={menus['search']}
          {...this.props} />
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
  userLogout,
  resetAuthrization,
  resetAuthrizationResult,
  invalidateTopicList,
  fetchTopicListIfNeeded
})(Menu);
