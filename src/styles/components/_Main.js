import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    backgroundColor: colors.white,
  }
});
