import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingItem from '~/components/SettingItem/SettingItem';
import FONT_SIZES from '~/constants/fontSize';
import * as configs from '~/config';
import { storeSettingsToStorage } from '~/modules/settings/settings.ducks';

import mainStyles from '~/common/styles/Main.style';
import settingsStyles from '~/containers/Settings/Settings.style';
import settingsItemStyles from '~/components/SettingItem/SettingItem.style';
import styles from '~/containers/SettingsFontSize/SettingsFontSize.style';

class SettingsFontSize extends Component {
  static navigationOptions = {
    title: '字号大小'
  }

  storeFontSize(fontSize) {
    this.props.storeSettingsToStorage({ fontSize });
  }

  render() {
    let { settings, navigation } = this.props;
    let selectedFontSize = FONT_SIZES.find(item => item.value === settings.fontSize);
    let authorLink = (
      <Text
        style={styles.url}
        onPress={() => navigation.navigate('Individual', {
          userId: configs.AUTHOR_ID,
          userName: configs.AUTHOR_NAME
        })}>
        {`@${configs.AUTHOR_NAME}`}
      </Text>
    );

    return (
      <View style={[mainStyles.container, styles.container]}>
        <View style={settingsStyles.group}>
          {FONT_SIZES.map((item, index) => (
            <SettingItem
              key={index}
              text={item.text}
              onPress={() => this.storeFontSize(item.value)}>
              <Text style={settingsItemStyles.indicator}>
                {settings.fontSize === item.value && <Icon style={styles.check} name='check' />}
              </Text>
            </SettingItem>
          ))}
        </View>
        <View style={[settingsStyles.group, styles.demo]}>
          <Text style={[styles.text, {
            fontSize: selectedFontSize.fontSize,
            lineHeight: selectedFontSize.lineHeight
          }]}>
            这款 App 是由畔友 {authorLink} 利用业余时间，用编程语言 JavaScript 完成的。
            App 不仅一直保持开源，也一直坚持着代码结构的整洁与最新技术的引入。
          </Text>
          <Text style={[styles.text, {
            marginTop: 10,
            fontSize: selectedFontSize.fontSize,
            lineHeight: selectedFontSize.lineHeight
          }]}>
            This App was created by {authorLink} in spare time with JavaScript.
            The App is still keeping open source, while also keeping code structure
            clean as well as introducing latest tech stack.
          </Text>
        </View>
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
  storeSettingsToStorage
})(SettingsFontSize);
