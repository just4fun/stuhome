import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: colors.underlay,
    backgroundColor: colors.white,
  },
  info: {
    color: colors.mainField,
  },
  indicator: {
    flex: 1,
    textAlign: 'right',
    color: colors.underlay,
  },
  avatarWapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  avatarIndicator: {
    marginLeft: 10,
    color: colors.underlay,
  }
});
