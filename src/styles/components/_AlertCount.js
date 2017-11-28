import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  alertCommonBackground: {
    backgroundColor: colors.alert,
    borderWidth: 1,
    borderColor: colors.alert,
    overflow: 'hidden'
  },
  alertBackground: {
    minWidth: 10,
    height: 10,
    borderRadius: 5,
    marginTop: -2,
    marginLeft: -5,
  },
  alertBackgroundWithCount: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 2,
  },
  alertCount: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
  },
});
