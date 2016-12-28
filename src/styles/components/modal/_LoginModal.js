import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

export default StyleSheet.create({
  top: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    height: 150,
    width: 150,
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
    borderColor: colors.buttonBorder,
    backgroundColor: colors.buttonBackground,
    marginTop: 30,
  },
  formSubmitText: {
    color: colors.white,
  },
  register: {
    fontSize: 16,
  }
});
