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

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableNotification: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('settings.notification')
                // The value stored in AsyncStorage is string.
                .then(value => {
                  debugger;
                  this.setState({ enableNotification: value === 'true' })
                });
  }

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
    // The value to store should be string, hence `toString()` here.
    AsyncStorage.setItem('settings.notification', value.toString())
                .then(() => {
                  debugger;
                  this.setState({ enableNotification: value })
                });
  }

  render() {
    let { router } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <Header title='设置'>
          <PopButton router={router} />
        </Header>
        <View style={styles.group}>
          <SettingItem
            text='清理缓存'
            onPress={() => this.clearCache()}/>
        </View>
        <View style={styles.group}>
          <SettingSwitchItem
            text='消息提醒'
            onValueChange={(value) => this.handleNotificationValueChange(value)}
            value={this.state.enableNotification} />
        </View>
      </View>
    );
  }
}
