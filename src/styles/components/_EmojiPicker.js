import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default StyleSheet.create({
  image: {
    height: 50,
    width: (window.width - 10) / 7,
    padding: 5
  },
  pageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
