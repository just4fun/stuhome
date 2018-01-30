import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from './AlertCount';
import styles from '../styles/components/_MenuItem';
import colors from '../styles/common/_colors';

export default class MenuItem extends Component {
  render() {
    let {
      menu: {
        title,
        icon,
        iconSize,
        routeName
      },
      navigation,
      style,
      showAlert,
      alertCount
    } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.menuUnderlay}
        onPress={() => navigation.navigate(routeName)}>
        <View style={[styles.row, style]}>
          <Icon style={[styles.icon, styles.item]} name={icon} size={+iconSize || 20} />
          <Text style={[styles.text, styles.item]}>{title}</Text>
          {showAlert && !!alertCount &&
            <View style={styles.alert}>
              <AlertCount count={alertCount} />
            </View>
          }
        </View>
      </TouchableHighlight>
    );
  }
}
