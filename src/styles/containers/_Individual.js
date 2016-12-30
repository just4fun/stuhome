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
    height: 100,
    width: 100,
    borderRadius: 50
  },
  userName: {
    marginTop: 10,
    color: colors.white
  },
  level: {
    color: colors.userLevel,
    marginTop: 5,
    fontSize: 12
  },
  info: {
    color: colors.white,
    marginTop: 5,
    fontSize: 12
  }
});
