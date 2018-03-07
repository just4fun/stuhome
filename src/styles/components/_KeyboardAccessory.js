import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  selection: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  item: {
    color: '#979797',
    width: 40
  }
});
