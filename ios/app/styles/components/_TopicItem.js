import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 10
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10
  },
  name: {
    flex: 1,
    textAlign: 'left',
    color: colors.mainField,
    paddingLeft: 10
  },
  date: {
    flex: 1,
    textAlign: 'right',
    color: colors.mainField,
    paddingRight: 10
  }
});
