import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    borderRightWidth: 1,
    borderRightColor: colors.underlay,
    backgroundColor: colors.white,
    paddingTop: 30,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
    paddingLeft: 30,
    paddingBottom: 15
  },
  avatar: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: colors.underlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  selectedRow: {
    backgroundColor: colors.underlay,
  },
  item: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
  },
  selectedItem: {
    color: colors.lightBlue,
  },
});
