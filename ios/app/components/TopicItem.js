import React, {
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
// refer to this issue https://github.com/moment/momentjs.com/pull/241
import 'moment/locale/zh-cn';
import styles from '../styles/components/_TopicItem';

export default class TopicItem extends Component {
  render() {
    let { title, user_nick_name, last_reply_date } = this.props.topic;

    /**
     * what API return for `last_reply_date` is string, like '1445063799000',
     * it will cause `Invalid date` if we use `new Date(last_reply_date)` or
     * `moment(last_reply_date).format()`, so just simply use `* 1` to convert.
     */
    last_reply_date = moment(last_reply_date * 1).startOf('minute').fromNow();

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='#ddd'
          onPress={() => this.props.router.toTopic(this.props.topic)}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{user_nick_name}</Text>
              <Text style={styles.date}>{last_reply_date}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
