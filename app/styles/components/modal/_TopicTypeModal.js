import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../../common/_colors';

const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  typePicker: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
  }
});
