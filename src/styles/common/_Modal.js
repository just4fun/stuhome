import { StyleSheet } from 'react-native';
import colors from './_colors';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    color: colors.lightBlue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    color: colors.disabledLightBlue,
  },
});
