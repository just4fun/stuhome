import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import headerRightButtonStyles from '~/common/styles/HeaderRightButton.style';

export default PublishButton = (props) => {
  const { style, onPress } = props;
  return (
    <Icon
      style={style || headerRightButtonStyles.button}
      name='pencil-square-o'
      size={18}
      onPress={onPress} />
  );
}
