import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');
const IMAGE_WIDTH = (window.width - 10 * 5 - 12) / 4;

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
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
    borderStyle: 'dashed'
  },
  image: {
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
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
