import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  forumHeader: {
    height: 25,
    backgroundColor: colors.underlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forumTitle: {
    fontSize: 16,
  },
});
