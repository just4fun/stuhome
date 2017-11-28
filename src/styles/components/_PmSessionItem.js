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
  row: {
    flexDirection: 'row',
  },
  alert: {
    backgroundColor: colors.alertBlue,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 2,
    marginRight: 4
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
  bold: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: colors.mainField,
  },
  replyContent: {
    marginTop: 10,
    color: colors.significantField,
  }
});
