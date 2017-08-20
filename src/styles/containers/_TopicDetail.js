import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.significantField,
  },
  info: {
    flexDirection: 'row',
    marginTop: 10,
  },
  views: {
    color: colors.mainField,
  },
  comments: {
    marginLeft: 5,
    color: colors.mainField,
  },
  postContent: {
    borderTopWidth: 1,
    borderColor: colors.underlay,
    padding: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  author: {
    flex: 1,
    marginLeft: 10,
    marginTop: 3,
  },
  name: {
    fontSize: 14,
  },
  level: {
    fontSize: 12,
    marginLeft: 5,
    marginTop: 1,
    color: colors.userLevel,
  },
  floor: {
    marginBottom: 8,
    color: colors.mainField,
  },
  commentHeader: {
    paddingHorizontal: 10,
    height: 20,
    backgroundColor: colors.lightBlue,
  },
  commentHeaderText: {
    fontSize: 12,
    marginTop: 3,
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  mobileIcon: {
    fontSize: 15,
    color: colors.mobileSign,
  },
  mobileText: {
    fontSize: 10,
    color: colors.mobileSign,
    marginLeft: 3,
    marginTop: 2,
  },
  mobileWrapper: {
    marginLeft: 5
  },
  dateArea: {
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: colors.mainField,
  },
  fullFavor: {
    color: '#ffa447'
  },
  emptyFavor: {
    color: colors.mainField,
  },
  favor: {
    textAlign: 'center',
  }
});
