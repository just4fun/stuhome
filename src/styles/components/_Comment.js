import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.underlay,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  author: {
    flex: 1,
    marginLeft: 10,
    marginTop: 3,
  },
  name: {
    fontSize: 12,
  },
  level: {
    fontSize: 10,
    marginLeft: 5,
    marginTop: 1,
    color: colors.userLevel,
  },
  floor: {
    fontSize: 12,
    color: colors.mainField,
  },
  comment: {
    marginTop: 10,
  },
  quote: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    marginBottom: 5,
    padding: 5,
  },
  quoteContent: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.mainField,
  },
  other: {
    flex: 1,
    flexDirection: 'row',
  },
  mobileWrapper: {
    marginLeft: 5,
  },
  mobileIcon: {
    fontSize: 14,
    color: colors.mobileSign,
    marginTop: 2,
  },
  mobileText: {
    fontSize: 10,
    color: colors.mobileSign,
    marginLeft: 3,
    marginTop: 3,
  },
  date: {
    marginTop: 2,
    fontSize: 10,
    color: colors.mainField,
  },
});
