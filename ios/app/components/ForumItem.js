import React, {
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import styles from '../styles/components/_ForumItem';

export default class ForumItem extends Component {
  _renderSubForum(subForum) {
    let { board_id, board_name, td_posts_num, last_posts_date } = subForum;

    last_posts_date = moment(last_posts_date * 1).startOf('minute').fromNow();

    return (
      <View key={board_id} style={styles.subForum}>
        <TouchableHighlight
          underlayColor='#ddd'
          onPress={() => this.props.router.toForum(subForum)}>
          <View>
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
        </TouchableHighlight>
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
          {board_list.map(this._renderSubForum.bind(this))}
        </View>
      </View>
    );
  }
}
