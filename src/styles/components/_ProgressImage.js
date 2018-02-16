import {
  StyleSheet,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = 250;

export default StyleSheet.create({
  image: {
    height: IMAGE_HEIGHT
  },
  indicator: {
    position: 'absolute',
    top: IMAGE_HEIGHT / 2,
    // `20` is width for ActivityIndicator.
    left: window.width / 2 - 20
  }
});
