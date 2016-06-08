import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  subForum: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  subForumRow: {
    flexDirection: 'row',
  },
  subForumTitle: {
    flex: 1,
    textAlign: 'left',
  },
  subForumTodayPostsNumber: {
    flex: 1,
    textAlign: 'right',
    color: colors.lightBlue,
  },
  subForumLastPostDate: {
    textAlign: 'left',
    color: colors.mainField,
    fontSize: 14,
    marginTop: 10,
  },
});
