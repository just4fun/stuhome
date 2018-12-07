import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '~/common/styles/colors.style';
import styles from './MenuBottomItem.style';

export default MenuBottomItem = (props) => {
  const {
    menu: {
      title,
      icon,
      iconSize,
      routeName
    },
    navigation,
    style,
    rowStyle,
    onPress
  } = props;

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
