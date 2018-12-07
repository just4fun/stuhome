import { StyleSheet } from 'react-native';
import colors from '~/common/styles/colors.style';

export default StyleSheet.create({
  avatarItem: {
    height: 60
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
    color: colors.mainField,
  }
});
