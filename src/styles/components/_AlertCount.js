import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  alertBackground: {
    backgroundColor: colors.alert,
    minWidth: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.alert,
    marginTop: 3,
    overflow: 'hidden'
  },
  alert: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    paddingTop: 1,
  },
});
