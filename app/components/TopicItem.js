import React, {
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// refer to this issue https://github.com/moment/momentjs.com/pull/241
import 'moment/locale/zh-cn';
import styles from '../styles/components/_TopicItem';
import colors from '../styles/common/_colors';

class TopicItem extends Component {
  render() {
    let {
      title,
      hits,
      replies,
      board_name,
      user_nick_name,
      last_reply_date
    } = this.props.topic;

    // `last_reply_date` is timestamp in string from API
    last_reply_date = moment(+last_reply_date).startOf('minute').fromNow();

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor={colors.underlay}
          onPress={() => this.props.router.toTopic(this.props.topic)}>
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.info}>
              <View style={styles.forumInfo}>
                <Text style={styles.forumName}>{board_name}</Text>
              </View>
              <View style={styles.details}>
                <Icon
                  style={styles.viewsInfo}
                  name='eye'>
                  {hits}
                </Icon>
                <Icon
                  style={styles.commentsInfo}
                  name='comments'>
                  {replies}
                </Icon>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.date}>{last_reply_date}</Text>
              <Text style={styles.name}>{user_nick_name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = TopicItem;
