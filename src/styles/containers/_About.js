import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

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
  description: {
    textAlign: 'center',
    marginBottom: 15,
  },
  group: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    textAlign: 'center',
  },
  text: {
    color: colors.mainField,
  },
});
