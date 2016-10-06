import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    padding: 10,
  },
  submit: {
    width: 50,
    height: 40,
    marginLeft: 5
  }
});
