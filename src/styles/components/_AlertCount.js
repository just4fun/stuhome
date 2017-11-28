import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  alertBackground: {
    backgroundColor: colors.alert,
    minWidth: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.alert,
    marginTop: 2,
    overflow: 'hidden'
  },
  alert: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
  },
});
