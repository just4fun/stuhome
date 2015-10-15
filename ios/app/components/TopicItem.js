import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 10
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10
  },
  name: {
    flex: 1,
    textAlign: 'left',
    color: '#B7B7B7',
    paddingLeft: 10
  },
  date: {
    flex: 1,
    textAlign: 'right',
    color: '#B7B7B7',
    paddingRight: 10
  }
});

export default class TopicItem extends Component {
  render() {
    const { title, user_nick_name, last_reply_date } = this.props.topic;

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
