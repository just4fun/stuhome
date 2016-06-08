import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

module.exports = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 0,
  },
  main: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
  },
  button: {
    padding: 15,
    textAlign: 'right',
  },
});
