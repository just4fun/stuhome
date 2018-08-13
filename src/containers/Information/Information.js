import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingItem from '~/components/SettingItem/SettingItem';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import ImagePicker from '~/services/ImagePicker';
import MENUS from '~/constants/menus';
import api from '~/services/api';
import { setSession } from '~/common/modules/user/session.ducks';
import { fetchUser, resetUser } from '~/common/modules/user/user.ducks';

import mainStyles from '~/common/styles/Main.style';
import indicatorStyles from '~/common/styles/Indicator.style';
import styles from '~/containers/About/About.style';

class Information extends Component {
  static navigationOptions = {
    title: MENUS.information.title
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
      this.props.setSession({
        ...this.props.session.data,
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

function mapStateToProps({ session, userItem }, ownProps) {
  return {
    loginUserId: _.get(session, ['data', 'uid']),
    userItem: _.get(userItem, ownProps.navigation.state.params.userId, {})
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  resetUser
})(Information);
