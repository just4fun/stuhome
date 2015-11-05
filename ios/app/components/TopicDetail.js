import React, {
  Component,
  View,
  Text,
  AlertIOS
} from 'react-native';
import styles from '../styles/components/_TopicDetail';
import { fetchTopic, resetTopic } from '../actions/topicAction';

export default class TopicDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.passProps.topic_id));
  }

  render() {
    const { dispatch, entity } = this.props;
    const { topicItem } = entity;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      this.props.router.pop();
      // clear the error
      dispatch(resetTopic());
      return <View></View>;
    }

    if (topicItem.isFetching || !topicItem.topic.topic_id) { return <View></View>; }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{topicItem.topic.content[0].infor}</Text>
      </View>
    );
  }
}
