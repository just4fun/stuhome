import { StyleSheet } from 'react-native';
import colors from '../common/_colors';
import Dimensions from 'Dimensions';
import imageStyles from './_ProgressImage';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    color: colors.mainField,
  },
  item: {
    marginVertical: 5,
  },
  imageWrapper: {
    width: window.width - 10 * 2,
  },
  image: {
    marginVertical: 5,
  },
  url: {
    color: colors.link,
  }
});
