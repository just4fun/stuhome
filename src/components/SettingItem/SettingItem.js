import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '~/common/styles/colors.style';
import styles from './SettingItem.style';

export default class SettingItem extends Component {
  render() {
    let { text, style, children } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={this.props.onPress}>
        <View style={[styles.item, style]}>
          <Text style={styles.info}>{text}</Text>
          {children || (
            <Text style={styles.indicator}>></Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
