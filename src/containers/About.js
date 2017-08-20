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
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import colors from '../styles/common/_colors';
import { AUTHOR_URL, SOURCE_URL, VERSION } from '../config';

export default class About extends Component {
  render() {
    let { router } = this.props;

    return (
      <View style={mainStyles.container}>
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
        <View style={styles.more}>
          <TouchableHighlight
            underlayColor={colors.underlay}
            onPress={() => router.toBrowser(AUTHOR_URL, '作者')}>
            <View style={styles.item}>
              <Image style={styles.avatar} source={require('../images/author.jpeg')} />
              <Text style={styles.info}>作者</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.underlay}
            onPress={() => router.toBrowser(SOURCE_URL, '源码')}>
            <View style={[styles.item, styles.lastItem]}>
              <Icon style={styles.github} name='github' size={48} />
              <Text style={styles.info}>源码</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={[styles.footer, styles.text]}>
          2015-2016 清水河畔@法律之光
        </Text>
      </View>
    );
  }
}
