import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

export default StyleSheet.create({
  form: {
    padding: 10,
  },
  disabledForm: {
    backgroundColor: colors.disable,
  },
  formItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  topicType: {
    flex: 1,
    paddingTop: 1,
    color: colors.significantField,
  },
  topicTypeIcon: {
    textAlign: 'right',
  },
  topicTitle: {
    flex: 1,
    paddingTop: 1,
    height: 20,
    fontSize: 14,
    color: colors.significantField,
  },
  topicContent: {
    flex: 1,
    height: 140,
    fontSize: 14,
    color: colors.significantField,
  },
  upload: {
    paddingTop: 10,
  }
});
