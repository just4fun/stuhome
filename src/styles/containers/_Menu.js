import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    paddingTop: 30,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: null
  },
  menus: {
    marginTop: 20
  },
});
