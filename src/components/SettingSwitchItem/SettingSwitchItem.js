import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
} from 'react-native';

import mainStyles from '~/components/SettingItem/SettingItem.style';
import styles from './SettingSwitchItem.style';

export default class SettingItem extends Component {
  render() {
    let { text, style, value, onValueChange } = this.props;

    return (
      <View style={[mainStyles.item, style]}>
        <Text style={mainStyles.info}>{text}</Text>
        <View style={styles.indicator}>
          <Switch
            style={styles.switch}
            onValueChange={onValueChange}
            value={value} />
        </View>
      </View>
    );
  }
}
