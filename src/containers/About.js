import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingItem from '../components/SettingItem';
import menus from '../constants/menus';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import colors from '../styles/common/_colors';
import { AUTHOR_URL, SOURCE_URL, VERSION, COPY_RIGHT, AUTHOR_ID, APP_STORE } from '../config';
import { getAlertCount } from '../selectors/alert';

class About extends Component {
  static navigationOptions = {
    title: menus.about.title,
    drawerLockMode: 'locked-closed'
  }

  render() {
    let {
      navigation,
      alertCount
    } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        {
          // <Header
          //   title='关于'
          //   alertCount={alertCount}
          //   updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        }
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require('../images/logo_transparent.png')} />
        </View>
        <Text style={[styles.information, styles.text]}>
          清水河畔 {VERSION}
        </Text>
        <Text style={[styles.information, styles.text]}>
          Powered by React Native with Redux
        </Text>
        <View style={styles.group}>
          <SettingItem
            text='去商店评分'
            onPress={() => Linking.openURL(APP_STORE)} />
          <SettingItem
            style={styles.lastItem}
            text='BUG 上报或意见反馈'
            onPress={() => navigation.navigate('PrivateMessage', {
              userId: AUTHOR_ID
            })} />
        </View>
        <View style={styles.group}>
          <SettingItem
            text='关于作者'
            onPress={() => Linking.openURL(AUTHOR_URL)} />
          <SettingItem
            url={SOURCE_URL}
            text='关注源码'
            onPress={() => Linking.openURL(SOURCE_URL)} />
        </View>
        <Text style={[styles.footer, styles.text]}>
          {COPY_RIGHT}
        </Text>
      </View>
    );
  }
}

function mapStateToProps({ alert }) {
  return {
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps)(About);
