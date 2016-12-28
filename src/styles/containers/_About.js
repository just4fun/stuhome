import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  top: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    height: 150,
    width: 150,
  },
  description: {
    textAlign: 'center',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: colors.underlay,
  },
  lastItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.underlay,
  },
  more: {
    marginTop: 20,
  },
  info: {
    marginLeft: 15
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
