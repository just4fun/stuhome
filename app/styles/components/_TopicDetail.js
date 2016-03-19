import {
  Image,
  StyleSheet
} from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  info: {
    flex: 1,
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
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    padding: 10,
  },
  authorInfo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarWapper: {
    flex: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: colors.underlay,
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
  contentItem: {
    marginVertical: 5,
  },
  contentImage: {
    height: 200,
    resizeMode: Image.resizeMode.contain,
  },
  commentHeader: {
    height: 20,
    backgroundColor: colors.underlay,
  },
  commentHeaderText: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    color: colors.white,
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
