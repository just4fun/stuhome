import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  icon: {
    color: colors.white,
    paddingTop: 8,
    paddingLeft: 30,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 25,
    opacity: 1,
  },
  item: {
    opacity: 0.9,
  },
  selectedRow: {
    backgroundColor: colors.menuUnderlay,
  },
  selectedItem: {
    opacity: 1,
    fontWeight: 'bold',
    color: colors.blue,
  },
});
