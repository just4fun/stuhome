import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  commentItem: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
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
    borderRadius: 10,
  },
  author: {
    flex: 3,
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
  floor: {
    flex: 1,
    textAlign: 'right',
    color: '#B7B7B7',
  },
  commentText: {
    lineHeight: 15,
    textAlign: 'justify',
  },
});
