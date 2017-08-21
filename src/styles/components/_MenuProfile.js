import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: 70,
    textAlign: 'center',
    color: colors.white,
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  infoWrapper: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  info: {
    fontSize: 12,
    marginBottom: 3,
    color: colors.white,
  },
  level: {
    color: colors.userLevel,
    marginBottom: 10
  },
});
