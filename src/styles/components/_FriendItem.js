import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: colors.significantField,
  },
});
