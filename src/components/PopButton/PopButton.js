import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default PopButton = (props) => {
  const { action, style, navigation } = props;
  return (
    <Icon
      style={style}
      name='angle-left'
      size={18}
      onPress={() => action ? action() : navigation.goBack()} />
  );
}
