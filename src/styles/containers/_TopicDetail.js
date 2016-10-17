import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  info: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  views: {
    color: colors.mainField,
    textAlign: 'left',
  },
  comments: {
    marginLeft: 5,
    color: colors.mainField,
    textAlign: 'left',
  },
  postContent: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    padding: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarWapper: {
    flex: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  author: {
    flex: 3,
    marginLeft: 10,
    marginTop: 3,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
  },
  level: {
    fontSize: 12,
    color: colors.userLevel,
  },
  floor: {
    flex: 1,
    textAlign: 'right',
    color: colors.mainField,
  },
  content: {
    marginVertical: 10,
  },
  commentHeader: {
    position: 'absolute',
    left: -10,
    right: -10,
    marginVertical: 10,
    height: 20,
    backgroundColor: colors.lightBlue,
  },
  commentHeaderText: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    color: colors.white,
  },
  commentHeaderSpace: {
    height: 40,
  },
  commentList: {
    padding: 10,
  },
  other: {
    flex: 1,
    flexDirection: 'row',
  },
  reply: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    color: colors.mainField,
  },
  mobileWrapper: {
    flex: 2,
    flexDirection: 'row',
  },
  mobileIcon: {
    fontSize: 20,
    color: colors.mobileSign,
  },
  mobileText: {
    fontSize: 12,
    color: colors.mobileSign,
    marginLeft: 3,
    marginTop: 4,
  },
  date: {
    flex: 1,
    textAlign: 'left',
    marginTop: 2,
    color: colors.mainField,
  },
});
