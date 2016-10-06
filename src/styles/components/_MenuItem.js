import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  icon: {
    color: colors.mainField,
    paddingTop: 8,
    paddingLeft: 30,
  },
  item: {
    color: colors.mainField,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  selectedRow: {
    backgroundColor: '#f5f5f5',
  },
  selectedItem: {
    color: colors.blue,
  },
});
