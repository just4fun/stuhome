import {
  StyleSheet,
  Dimensions
} from 'react-native';
import colors from '~/common/styles/colors.style';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = 250;

export default StyleSheet.create({
  image: {
    height: IMAGE_HEIGHT
  },
  indicator: {
    position: 'absolute',
    top: IMAGE_HEIGHT / 2,
    // window.width / 2 - (width of ActivityIndicator / 2 + margin of image)
    left: window.width / 2 - (20 / 2 + 10)
  },
  text: {
    position: 'absolute',
    top: IMAGE_HEIGHT / 2 + 60,
    // window.width / 2 - (width of `图片加载失败或图片已失效` / 2 + margin of image)
    left: window.width / 2 - (168 / 2 + 10),
    color: colors.mainField
  }
});
