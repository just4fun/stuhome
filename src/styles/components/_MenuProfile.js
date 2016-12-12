import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  menuHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
    paddingHorizontal: 30,
    paddingBottom: 12
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
  name: {
    width: 70,
    textAlign: 'center',
    color: colors.mainField,
    marginTop: 5
  },
  infoWrapper: {
    marginLeft: 10,
    marginTop: 5
  },
  info: {
    fontSize: 12,
    marginBottom: 3,
    color: colors.mainField,
  },
  level: {
    color: colors.userLevel,
    marginBottom: 10
  }
});
