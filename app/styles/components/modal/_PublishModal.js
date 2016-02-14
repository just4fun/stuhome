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
  formIcon: {
    width: 50,
  },
  formIconLeft: {
    textAlign: 'left',
  },
  formIconRight: {
    textAlign: 'right',
  },
  topicType: {
    flex: 1,
  },
  topicTitle: {
    flex: 1,
    fontSize: 14,
  },
  topicContent: {
    flex: 1,
    height: 200,
    fontSize: 14,
  }
});
