import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_MenuBottomItem';
import colors from '../styles/common/_colors';

export default class MenuBottomItem extends Component {
  render() {
    let { menu, navigation, style, rowStyle, onPress } = this.props;
    let { title, icon, iconSize, routeName } = menu;

    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          // The custom `onPress` event is used for logout button
          // which would not navigate to other page.
          if (onPress) {
            onPress();
            return;
          }
          navigation.navigate(routeName);
        }}>
        <View style={[styles.row, rowStyle]}>
          <Icon style={[styles.icon, styles.item]} name={icon} size={+iconSize || 18} />
          <Text style={[styles.text, styles.item]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
