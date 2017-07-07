import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay
  },
  item: {
    margin: 10,
  },
  authorInfo: {
    flexDirection: 'row',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  author: {
    flex: 2,
    marginLeft: 8,
    marginTop: 3,
  },
  name: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: colors.mainField,
  },
  replyContent: {
    marginTop: 10,
  }
});
