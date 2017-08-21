import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  subForum: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.significantField,
  },
  number: {
    fontSize: 12,
    color: colors.mainField,
  },
  numberText: {
    fontSize: 12,
    color: colors.mainField,
  },
  left: {
    width: 40,
    marginLeft: 10,
    marginRight: 15,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  leftInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  rightInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  subForumLastPostDate: {
    marginTop: 10,
    fontSize: 12,
  },
  postsNumber: {
    color: colors.lightBlue,
  },
  todayNumber: {
    color: colors.todayNumber,
  },
});
