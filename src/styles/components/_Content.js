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
    // the height here should be larger than the height in `_ProgressImage.js`,
    // it's a hacky way to resolve that both `margin` and `padding` could not
    // be used for any components nested in <Text>, since they're not rectangles.
    //
    // https://github.com/facebook/react-native/issues/6728#issuecomment-203516600
    // height: 260
  },
  image: {
    marginVertical: 5,
  },
  url: {
    color: colors.link,
  }
});
