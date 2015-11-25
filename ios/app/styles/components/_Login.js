import { StyleSheet } from 'react-native';
import colors from '../common/_colors';


module.exports = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  formItem: {
    height: 40,
    borderRadius: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: colors.underlay,
    padding: 10,
    marginBottom: 10,
  },
  formSubmit: {
    color: colors.white,
    backgroundColor: colors.submit,
    paddingTop: 8,
  }
});
