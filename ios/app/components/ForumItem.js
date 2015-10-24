import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';
import moment from 'moment';

moment.locale('zh-cn');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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

export default class ForumItem extends Component {
  _renderSubForum(subForum) {
    let { board_id, board_name, td_posts_num, last_posts_date } = subForum;

    last_posts_date = moment(last_posts_date * 1).startOf('minute').fromNow();

    return (
      <View key={board_id} style={styles.subForum}>
        <View style={styles.subForumRow}>
          <Text style={styles.subForumTitle}>{board_name}</Text>
          {td_posts_num !== 0 &&
            <Text style={styles.subForumTodayPostsNumber}>
              ({td_posts_num})
            </Text>
          }
        </View>
        <Text style={styles.subForumLastPostDate}>{last_posts_date}</Text>
      </View>
    );
  }

  render() {
    const { board_category_name, board_list } = this.props.forum;

    return (
      <View style={styles.container}>
        <View style={styles.forumHeader}>
          <Text style={styles.forumTitle}>{board_category_name}</Text>
        </View>
        <View>
          {board_list.map(this._renderSubForum)}
        </View>
      </View>
    );
  }
}
