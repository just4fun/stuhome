import React, {
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_SubForumItem';

class SubForumItem extends Component {
  render() {
    let { router, subForum } = this.props;
    let {
      board_id,
      board_name,
      td_posts_num,
      last_posts_date
    } = subForum;

    last_posts_date = moment(+last_posts_date).startOf('minute').fromNow();

    return (
      <TouchableHighlight
        key={board_id}
        underlayColor={colors.underlay}
        onPress={() => router.toForum(subForum)}>
        <View style={styles.subForum}>
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
    );
  }
}

module.exports = SubForumItem;
