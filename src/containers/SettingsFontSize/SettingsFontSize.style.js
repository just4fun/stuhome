import { StyleSheet } from 'react-native';
import colors from '~/common/styles/colors.style';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  check: {
    color: '#69d57a'
  },
  demo: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    padding: 15
  },
  text: {
    color: colors.mainField
  },
  url: {
    color: colors.link
  }
});
