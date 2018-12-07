import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '~/components/AlertCount/AlertCount';

import colors from '~/common/styles/colors.style';
import styles from './MenuItem.style';

export default MenuItem = (props) => {
  const {
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
  } = props;

  return (
    <TouchableHighlight
      underlayColor={colors.menuUnderlay}
      onPress={() => navigation.push(routeName)}>
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
