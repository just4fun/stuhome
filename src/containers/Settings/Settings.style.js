import { StyleSheet } from 'react-native';
import colors from '~/common/styles/colors.style';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  group: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  text: {
    color: colors.mainField,
  },
  explanation: {
    marginVertical: 5,
    paddingHorizontal: 20,
    fontSize: 13,
  }
});
