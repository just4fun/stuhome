import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
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
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
