import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
    justifyContent: 'center',
    paddingTop: 30
  },
  left: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 2
  },
  title: {
    width: 150,
    fontSize: 18,
    textAlign: 'center'
  },
  right: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 2
  }
});
