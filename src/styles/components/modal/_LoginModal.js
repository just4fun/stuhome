import { StyleSheet } from 'react-native';
import colors from '../../common/_colors';

export default StyleSheet.create({
  top: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    height: 120,
    width: 120,
  },
  form: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  formItem: {
    height: 40,
    borderRadius: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: 10,
    marginBottom: 10,
    color: colors.white,
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
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: null,
    width: null,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
});
