import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import AboutItem from '../components/AboutItem';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import colors from '../styles/common/_colors';
import { AUTHOR_URL, SOURCE_URL, VERSION, COPY_RIGHT, AUTHOR_ID, APP_STORE } from '../config';
import { getAlertCount } from '../selectors/alert';

class About extends Component {
  render() {
    let {
      router,
      alertCount
    } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <Header
          title='关于'
          alertCount={alertCount}
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require('../images/logo_transparent.png')} />
        </View>
        <Text style={[styles.description, styles.text]}>
          清水河畔 {VERSION}
        </Text>
        <Text style={[styles.description, styles.text]}>
          Powered by React Native with Redux
        </Text>
        <View style={styles.group}>
          <AboutItem
            text='去商店评分'
            onPress={() => Linking.openURL(APP_STORE)} />
          <AboutItem
            style={styles.lastItem}
            text='BUG 上报或意见反馈'
            onPress={() => router.toPmList({
              userId: AUTHOR_ID
            })} />
          </View>
          <View style={styles.group}>
            <AboutItem
              text='关于作者'
              onPress={() => Linking.openURL(AUTHOR_URL)} />
            <AboutItem
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
