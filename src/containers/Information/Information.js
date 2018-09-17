import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingItem from '~/components/SettingItem/SettingItem';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import ImagePicker from '~/services/ImagePicker';
import MENUS from '~/constants/menus';
import MessageBar from '~/services/MessageBar';
import api from '~/services/api';
import { setSession } from '~/modules/user/session/session.ducks';
import {
  fetchUser,
  cancelUser,
  resetUser
} from '~/modules/user/user/user.ducks';

import mainStyles from '~/common/styles/Main.style';
import aboutStyles from '~/containers/About/About.style';
import settingItemStyles from '~/components/SettingItem/SettingItem.style';
import styles from './Information.style';

class Information extends Component {
  static navigationOptions = {
    title: MENUS.information.title
  }

  constructor(props) {
    super(props);

    this.userId = this.props.navigation.state.params.userId;
    const { loginUserId } = this.props;
    this.isLoginUser = loginUserId === this.userId;
  }

  componentDidMount() {
    this.props.fetchUser({ userId: this.userId });
  }

  componentWillUnmount() {
    this.props.cancelUser();
    this.props.resetUser();
  }

  uploadPhoto(image) {
    api.uploadAvatar(image).then(response => {
      if (!response.data.rs) {
        MessageBar.show({
          message: '修改头像失败',
          type: 'error'
        });
      } else {
        // 1. update redux store
        this.props.setSession({
          ...this.props.session.data,
          avatar: response.data.pic_path
        });
        // 2. update storage

        // Actually we have no need to do 1 & 2, since the path of avatar
        // always be 301 redirect, which is not real path.

        MessageBar.show({
          message: '修改头像成功。可能会有延迟。',
          type: 'success'
        });
      }
    });
  }

  handleAvatarPress() {
    if (!this.isLoginUser) { return; }

    const photoOptions = {
      width: 500,
      height: 500,
      cropping: true
    };
    ImagePicker.showUploadDialog({
      takePhotoOptions: photoOptions,
      selectPhotoOptions: photoOptions,
      uploadAction: (image) => this.uploadPhoto(image)
    });
  }

  getGender(gender) {
    if (gender === 1) { return '男生'; }

    if (gender === 2 ) { return '女生'; }

    return '保密';
  }

  render() {
    const {
      userItem: {
        isFetching,
        user
      }
    } = this.props;

    if (isFetching || !user) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <View style={[mainStyles.container, aboutStyles.container]}>
        <View style={aboutStyles.group}>
          <SettingItem
            text='头像'
            style={styles.avatarItem}
            onPress={() => this.handleAvatarPress()}>
            <View style={styles.avatarWapper}>
              <Image
                style={styles.avatar}
                source={{ uri: user.icon }} />
              {this.isLoginUser && <Text style={styles.avatarIndicator}>></Text>}
            </View>
          </SettingItem>
          <SettingItem
            text='昵称'>
            <Text style={settingItemStyles.indicator}>
              {user.name}
            </Text>
          </SettingItem>
          <SettingItem
            text='性别'>
            <Text style={settingItemStyles.indicator}>
              {this.getGender(user.gender)}
            </Text>
          </SettingItem>
          <SettingItem
            text='等级'>
            <Text style={settingItemStyles.indicator}>
              {user.userTitle}
            </Text>
          </SettingItem>
          <SettingItem
            text='积分'>
            <Text style={settingItemStyles.indicator}>
              {user.credits}
            </Text>
          </SettingItem>
          <SettingItem
            text='水滴'>
            <Text style={settingItemStyles.indicator}>
              {user.gold_num}
            </Text>
          </SettingItem>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ session, userItem }) {
  return {
    loginUserId: _.get(session, ['data', 'uid']),
    userItem
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  cancelUser,
  resetUser,
  setSession
})(Information);
