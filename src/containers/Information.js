import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Linking,
  AlertIOS,
  AsyncStorage,
  ActionSheetIOS,
  ActivityIndicator
} from 'react-native';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setAuthrization } from '../actions/authorizeAction';
import menus from '../constants/menus';
import SettingItem from '../components/SettingItem';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import styles from '../styles/containers/_About';
import api from '../services/api';
import MESSAGES from '../constants/messages'
import { fetchUser, resetUser } from '../actions/user/userAction';

class Information extends Component {
  static navigationOptions = {
    title: menus.information.title
  }

  constructor(props) {
    super(props);

    this.userId = this.props.navigation.state.params.userId;
    let { loginUserId } = this.props;
    this.isLoginUser = loginUserId === this.userId;
  }

  componentDidMount() {
    this.props.fetchUser({ userId: this.userId });
  }

  componentWillUnmount() {
    this.props.resetUser({ userId: this.userId });
  }

  handleTakePhoto() {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      this.uploadPhoto(image);
    }).catch(e => {
      if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
        AlertIOS.alert('提示', MESSAGES[e.code]);
      } else if (e.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
        this.goToAppSettings(MESSAGES[e.code]);
      }
    });
  }

  handleSelectPhoto() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      this.uploadPhoto(image);
    }).catch(e => {
      if (e.code === 'E_PERMISSION_MISSING') {
        this.goToAppSettings(MESSAGES[e.code]);
      }
    });
  }

  goToAppSettings(message) {
    AlertIOS.alert(
      '提示',
      message,
      [
        { text: '取消', style: 'cancel' },
        { text: '前往', onPress: () => Linking.openURL('app-settings:') },
      ],
    );
  }

  uploadPhoto(image) {
    api.uploadAvatar(image).then(response => {
      // update redux store
      this.props.setAuthrization({
        ...this.props.user.authrization,
        avatar: response.data.pic_path
      });
      // update storage
    });
  }

  showAvatarUpdateDialog() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '拍照',
        '从手机相册选择',
        '取消'
      ],
      cancelButtonIndex: 2
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.handleTakePhoto();
          break;
        case 1:
          this.handleSelectPhoto();
          break;
      }
    });
  }

  getGender(gender) {
    if (gender === 1) { return '男生'; }

    if (gender === 2 ) { return '女生'; }

    return '保密';
  }

  render() {
    let {
      userItem,
      userItem: {
        isFetching,
        user
      }
    } = this.props;

    if (isFetching || !_.get(userItem, ['user', 'name'])) {
      return (
        <View style={mainStyles.container}>
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View style={[mainStyles.container, styles.container]}>
        <View style={styles.group}>
          <SettingItem
            text='头像'
            style={styles.informationAvatar}
            avatar={user.icon}
            isLoginUser={this.isLoginUser}
            onPress={() => {
              if (this.isLoginUser) {
                this.showAvatarUpdateDialog();
              }
            }} />
          <SettingItem
            text='昵称'
            indicator={user.name} />
          <SettingItem
            text='性别'
            indicator={this.getGender(user.gender)} />
          <SettingItem
            text='等级'
            indicator={user.userTitle} />
          <SettingItem
            text='积分'
            indicator={user.credits} />
          <SettingItem
            text='水滴'
            indicator={user.gold_num} />
        </View>
      </View>
    );
  }
}

function mapStateToProps({ user, userItem }, ownProps) {
  return {
    loginUserId: _.get(user, ['authrization', 'uid']),
    userItem: _.get(userItem, ownProps.navigation.state.params.userId, {})
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  resetUser
})(Information);
