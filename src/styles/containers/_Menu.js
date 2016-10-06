import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    borderRightWidth: 1,
    borderRightColor: colors.underlay,
    backgroundColor: colors.white,
    paddingTop: 30,
  },
});
