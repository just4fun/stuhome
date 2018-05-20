import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from '../services/ImagePicker';
import { setAuthrization } from '../actions/authorizeAction';
import menus from '../constants/menus';
import SettingItem from '../components/SettingItem';
import LoadingSpinner from '../components/LoadingSpinner';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import styles from '../styles/containers/_About';
import api from '../services/api';
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

  handleAvatarPress() {
    if (!this.isLoginUser) { return; }

    let photoOptions = {
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
    let {
      userItem,
      userItem: {
        isFetching,
        user
      }
    } = this.props;

    if (isFetching || !_.get(userItem, ['user', 'name'])) {
      return (
        <LoadingSpinner />
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
            onPress={() => this.handleAvatarPress()} />
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
