import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  forumHeader: {
    height: 25,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forumTitle: {
    color: colors.white,
    fontSize: 16,
  },
});
