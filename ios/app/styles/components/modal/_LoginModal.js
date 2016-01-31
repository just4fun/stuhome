import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

module.exports = StyleSheet.create({
  close: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40,
  },
  top: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    color: colors.mainField,
    marginVertical: 20,
  },
  form: {
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
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    marginTop: 30,
  },
  formSubmitText: {
    color: colors.white,
  }
});
