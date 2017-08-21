import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_MenuItem';
import colors from '../styles/common/_colors';

export default class MenuItem extends Component {
  render() {
    let { menu, router, isCurrentRoute, style } = this.props;
    let { title, icon, iconSize, actionName } = menu;

    return (
      <TouchableHighlight
        underlayColor={colors.menuUnderlay}
        onPress={() => this.props.selectMenuItem(menu)}>
        <View style={[styles.row, style, isCurrentRoute(menu) && styles.selectedRow]}>
          <Icon style={[styles.icon, styles.item, isCurrentRoute(menu) && styles.selectedItem]} name={icon} size={+iconSize || 20} />
          <Text style={[styles.text, styles.item, isCurrentRoute(menu) && styles.selectedItem]}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
