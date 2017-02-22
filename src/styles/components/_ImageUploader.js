import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    height: 80,
    width: 80,
    borderStyle: 'dashed'
  },
  image: {
    height: 80,
    width: 80,
  },
  remove: {
    position: 'absolute',
    top: 2,
    right: 2,
    opacity: 0.5,
  },
  uploader: {
    color: colors.underlay,
  }
});
