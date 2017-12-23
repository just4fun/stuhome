import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  icon: {
    color: colors.white,
  },
  text: {
    color: colors.white,
    fontSize: 17,
    marginLeft: 8,
  },
  item: {
    opacity: 0.9,
  },
});
