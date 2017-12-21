import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageCache } from "react-native-img-cache";
import { PopButton } from '../components/button';
import Header from '../components/Header';
import SettingItem from '../components/SettingItem';
import SettingSwitchItem from '../components/SettingSwitchItem';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import { getSettingsFromStorage, putSettingsToStorage } from '../actions/settingsAction';
import { resetAlerts } from '../actions/message/alertAction';

class Settings extends Component {
  clearCache() {
    AlertIOS.alert(
      '提示',
      '确定清理图片缓存？',
      [
        { text: '取消', style: 'cancel' },
        { text: '清除', onPress: () => ImageCache.get().clear().then(() => {
          AlertIOS.alert('提示', '清理成功');
        }) },
      ],
    );
  }

  handleNotificationValueChange(value) {
    this.props.putSettingsToStorage({ enableNotification: value });
    // clear message alters
    this.props.resetAlerts();
  }

  render() {
    let { router, settings } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <Header title='设置'>
          <PopButton router={router} />
        </Header>
        {
          // <View style={styles.group}>
          //   <SettingItem
          //     text='清理缓存'
          //     onPress={() => this.clearCache()}/>
          // </View>
        }
        <View style={styles.group}>
          <SettingSwitchItem
            text='消息提醒'
            onValueChange={(value) => this.handleNotificationValueChange(value)}
            value={settings.enableNotification} />
        </View>
        <Text style={[styles.explanation, styles.text]}>
          开启“消息提醒”，每15s会自动获取“提到我的”、“回复”、“私信”，并在有新信息时在根目录左上角显示小红点，并在侧边栏显示未读消息数字。
        </Text>
      </View>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings
  };
}

export default connect(mapStateToProps, {
  getSettingsFromStorage,
  putSettingsToStorage,
  resetAlerts
})(Settings);
