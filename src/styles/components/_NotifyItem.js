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
    color: colors.significantField,
  },
  date: {
    fontSize: 12,
    color: colors.mainField,
  },
  replyContent: {
    marginVertical: 10,
    color: colors.significantField,
  },
  quote: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.underlay,
    marginBottom: 20,
    padding: 5,
  },
  topicContent: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.mainField,
  },
  reply: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 50,
    height: 30,
    borderColor: colors.buttonBorder,
    backgroundColor: colors.buttonBackground,
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
  },
});
