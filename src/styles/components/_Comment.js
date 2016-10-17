import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  commentItem: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    marginBottom: 10,
    padding: 10,
  },
  authorInfo: {
    flexDirection: 'row',
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  author: {
    flex: 2,
    marginLeft: 5,
    marginTop: 3,
  },
  name: {
    fontSize: 12,
    marginBottom: 3,
  },
  level: {
    fontSize: 10,
    color: colors.userLevel,
  },
  floor: {
    flex: 1,
    textAlign: 'right',
    color: colors.mainField,
  },
  comment: {
    marginVertical: 10,
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
  reply: {
    flex: 1,
    textAlign: 'right',
    color: colors.mainField,
  },
  mobileWrapper: {
    flex: 2,
    flexDirection: 'row',
  },
  mobileIcon: {
    fontSize: 16,
    color: colors.mobileSign,
    marginTop: 1,
  },
  mobileText: {
    fontSize: 12,
    color: colors.mobileSign,
    marginLeft: 3,
    marginTop: 3,
  },
  date: {
    flex: 1,
    textAlign: 'left',
    marginTop: 2,
    fontSize: 12,
    color: colors.mainField,
  },
});
