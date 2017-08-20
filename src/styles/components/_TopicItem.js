import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 6,
    borderBottomColor: colors.underlay
  },
  item: {
    margin: 10
  },
  row: {
    flexDirection: 'row',
  },
  left: {
    width: 40,
    marginRight: 5
  },
  right: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    color: colors.significantField,
    fontWeight: '400',
  },
  date: {
    fontSize: 11,
    color: colors.mainField,
    marginTop: 5,
  },
  title: {
    marginTop: 8,
    fontSize: 15,
    color: colors.significantField,
  },
  subject: {
    marginTop: 5,
    fontSize: 12,
    color: colors.mainField,
  },
  leftInfo: {
    flex: 1,
  },
  rightInfo: {
    flex: 1,
  },
  forumBorder: {
    backgroundColor: colors.lightBlue,
    borderRadius: 2,
    padding: 3,
    marginBottom: 5,
  },
  forumName: {
    color: colors.white,
    fontSize: 12,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 5,
  },
  viewsInfo: {
    color: colors.mainField,
    textAlign: 'left',
  },
  commentsInfo: {
    marginLeft: 5,
    color: colors.mainField,
    textAlign: 'left',
  },
});
