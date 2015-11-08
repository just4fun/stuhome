import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {

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
    color: '#B7B7B7',
    textAlign: 'left',
  },
  comments: {
    marginLeft: 5,
    color: '#B7B7B7',
    textAlign: 'left',
  },
  date: {
    flex: 1,
    color: '#B7B7B7',
    textAlign: 'right',
  },
  authorInfo: {
    flex: 1,
    flexDirection: 'row',
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
    flex: 4,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
  },
  level: {
    fontSize: 12,
    color: '#F16F53',
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    padding: 10,
  },
  contentText: {
    lineHeight: 18,
    textAlign: 'justify',
  },
});
