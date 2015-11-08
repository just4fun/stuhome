import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  forumHeader: {
    height: 25,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forumTitle: {
    fontSize: 16,
  },
  subForum: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subForumRow: {
    flexDirection: 'row',
  },
  subForumTitle: {
    flex: 1,
    textAlign: 'left',
  },
  subForumTodayPostsNumber: {
    flex: 1,
    textAlign: 'right',
    color: '#21B6F2',
  },
  subForumLastPostDate: {
    textAlign: 'left',
    color: '#B7B7B7',
    fontSize: 14,
    marginTop: 10,
  }
});
