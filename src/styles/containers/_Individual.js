import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  nav: {
    backgroundColor: colors.lightBlue,
    borderBottomWidth: 0,
  },
  header: {
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    paddingBottom: 10,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  userName: {
    marginTop: 10,
    color: colors.white
  }
});
