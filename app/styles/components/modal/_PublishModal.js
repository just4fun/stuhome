import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

module.exports = StyleSheet.create({
  form: {
    margin: 10,
  },
  formItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  topicType: {
    flex: 1,
    paddingTop: 1,
  },
  topicTypeIcon: {
    textAlign: 'right',
  },
  topicTitle: {
    flex: 1,
    paddingTop: 1,
    height: 20,
    fontSize: 14,
  },
  topicContent: {
    flex: 1,
    height: 200,
    fontSize: 14,
  }
});
