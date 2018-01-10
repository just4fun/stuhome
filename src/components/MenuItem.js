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
    let { menu, navigation, style, showAlert, alertCount} = this.props;
    let { title, icon, iconSize, actionName } = menu;

    return (
      <TouchableHighlight
        underlayColor={colors.menuUnderlay}
        onPress={() => this.props.selectMenuItem(menu)}>
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
