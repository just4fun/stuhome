import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, findNodeHandle } from 'react-native';
import { BlurView } from 'react-native-blur';
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
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';
import menus from '../constants/menus';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: false,
      viewRef: null
    };
  }

  componentDidMount() {
    this.props.getUserFromStorage();
  }

  toggleLoginModal(visible) {
    this.setState({
      isLoginModalOpen: visible
    });
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    let { user } = this.props;
    let { isLoginModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={require('../images/gingko.jpeg')}
          style={styles.blur}
          onLoadEnd={this.imageLoaded.bind(this)} />
        <BlurView
          style={styles.blur}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={5} />
        {isLoginModalOpen &&
          <LoginModal
            visible={isLoginModalOpen}
            menus={menus}
            closeLoginModal={() => this.toggleLoginModal(false)}
            {...this.props} />
        }
        <MenuProfile
          authrization={user.authrization}
          openLoginModal={() => this.toggleLoginModal(true)}
          menus={menus}
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
            <MenuItem
              menu={menus['individual']}
              {...this.props} />
          </View>
        }
        <MenuItem
          menu={menus['about']}
          {...this.props} />
      </View>
    );
  }
}

function mapStateToProps({ user }) {
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
  fetchTopicList
})(Menu);
