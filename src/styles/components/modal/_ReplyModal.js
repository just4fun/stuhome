import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default StyleSheet.create({
  replyBox: {
    padding: 10,
    // window.height - header.height
    height: window.height - 60,
    fontSize: 16,
  },
});
