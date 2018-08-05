import { StyleSheet } from 'react-native';
import colors from '~/common/styles/colors.style';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  top: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },
  information: {
    textAlign: 'center',
    marginBottom: 15,
  },
  group: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  text: {
    color: colors.mainField,
  },
  informationAvatar: {
    height: 60
  }
});
