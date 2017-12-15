import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_SettingItem';
import colors from '../styles/common/_colors';

export default class SettingItem extends Component {
  render() {
    let { text, style } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={this.props.onPress}>
        <View style={[styles.item, style]}>
          <Text style={styles.info}>{text}</Text>
          <Text style={styles.indicator}>></Text>
        </View>
      </TouchableHighlight>
    );
  }
}
