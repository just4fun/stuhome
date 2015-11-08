import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    backgroundColor: '#fff'
  }
});
