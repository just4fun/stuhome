import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ActionSheetIOS,
  AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setAuthrization } from '../actions/authorizeAction';
import menus from '../constants/menus';
import SettingItem from '../components/SettingItem';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import api from '../services/api';

class Information extends Component {
  static navigationOptions = {
    title: menus.information.title
  }

  handleTakePhoto() {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      this.uploadPhoto(image);
    });
  }

  handleSelectPhoto() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      this.uploadPhoto(image);
    });
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
      user: {
        authrization: {
          avatar,
          userName,
          userTitle,
          gender,
          creditShowList
        }
      }
    } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <View style={styles.group}>
          <SettingItem
            text='头像'
            style={styles.informationAvatar}
            avatar={avatar}
            onPress={() => this.showAvatarUpdateDialog()} />
          <SettingItem
            text='昵称'
            indicator={userName} />
          <SettingItem
            text='性别'
            indicator={this.getGender(gender)} />
          <SettingItem
            text='等级'
            indicator={userTitle} />
          <SettingItem
            text='积分'
            indicator={creditShowList[0].data} />
          <SettingItem
            text='水滴'
            indicator={creditShowList[1].data} />
        </View>
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
  setAuthrization
})(Information);
