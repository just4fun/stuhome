import React, {
  Component,
  View,
  Text
} from 'react-native';
import moment from 'moment';
import styles from '../styles/components/_TopicItem';

moment.locale('zh-cn');

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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{user_nick_name}</Text>
          <Text style={styles.date}>{last_reply_date}</Text>
        </View>
      </View>
    );
  }
}
