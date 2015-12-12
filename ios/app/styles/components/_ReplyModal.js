import {
  Image,
  StyleSheet
} from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  replyBox: {
    padding: 10,
    height: 500,
    fontSize: 16,
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
