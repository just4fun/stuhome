import {
  StyleSheet,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  image: {
    flex: 1
  }
});
