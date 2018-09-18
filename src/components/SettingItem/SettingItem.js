import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '~/common/styles/colors.style';
import styles from './SettingItem.style';

export default SettingItem = (props) => {
  const { text, style, children, onPress } = props;
  return (
    <TouchableHighlight
      underlayColor={colors.underlay}
      onPress={onPress}>
      <View style={[styles.item, style]}>
        <Text style={styles.info}>{text}</Text>
        {children || (
          <Text style={styles.indicator}>></Text>
        )}
      </View>
    </TouchableHighlight>
  );
}
