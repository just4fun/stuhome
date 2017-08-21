import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import AboutItem from '../components/AboutItem';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import colors from '../styles/common/_colors';
import { AUTHOR_URL, SOURCE_URL, VERSION, COPY_RIGHT, FEEDBACK, APP_STORE } from '../config';

export default class About extends Component {
  render() {
    let { router } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <Header
          title='关于'
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <View style={styles.top}>
          <Image style={styles.logo} source={require('../images/logo_transparent.png')} />
        </View>
        <Text style={[styles.description, styles.text]}>
          清水河畔 {VERSION}
        </Text>
        <Text style={[styles.description, styles.text]}>
          Powered by React Native with Redux
        </Text>
        <View style={styles.group}>
          <AboutItem
            url={APP_STORE}
            text='去商店评分' />
          <AboutItem
            style={styles.lastItem}
            url={FEEDBACK}
            text='BUG 上报或意见反馈' />
          </View>
          <View style={styles.group}>
            <AboutItem
              url={AUTHOR_URL}
              text='关于作者' />
            <AboutItem
              style={styles.lastItem}
              url={SOURCE_URL}
              text='关注源码' />
          </View>
        <Text style={[styles.footer, styles.text]}>
          {COPY_RIGHT}
        </Text>
      </View>
    );
  }
}
