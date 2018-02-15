import { StyleSheet } from 'react-native';
import colors from '../common/_colors';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  selection: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  item: {
    color: '#979797',
    width: 40
  },
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
