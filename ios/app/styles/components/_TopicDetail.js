import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
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
  postContent: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  authorInfo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarWapper: {
    flex: 1,
    textAlign: 'left',
  },
  avatar: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  author: {
    flex: 3,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 3,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
  },
  level: {
    fontSize: 12,
    color: '#F16F53',
  },
  floor: {
    flex: 1,
    textAlign: 'right',
    color: '#B7B7B7',
  },
  contentText: {
    lineHeight: 18,
    textAlign: 'justify',
  },
  commentHeader: {
    height: 20,
    backgroundColor: '#ddd',
  },
  commentHeaderText: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    color: '#fff',
  },
  commentList: {
    padding: 10,
  },
});
