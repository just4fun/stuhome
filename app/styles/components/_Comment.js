import {
  Image,
  StyleSheet
} from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  commentItem: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    marginBottom: 10,
    padding: 10,
  },
  authorInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    flex: 1,
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: colors.underlay,
    borderRadius: 10,
  },
  author: {
    flex: 7,
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
  commentSection: {
    marginVertical: 5,
  },
  commentImage: {
    height: 200,
    resizeMode: Image.resizeMode.contain,
  },
  other: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: colors.mainField,
  },
});
