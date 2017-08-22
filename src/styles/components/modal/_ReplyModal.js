import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

export default StyleSheet.create({
  disabledForm: {
    backgroundColor: colors.disable,
  },
  replyBox: {
    padding: 10,
    height: 200,
    fontSize: 16,
    color: colors.significantField,
  },
  formItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  upload: {
    padding: 10,
  }
});
