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

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, entity } = nextProps;
    const { topicItem } = entity;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.router.pop();
      return false;
    }

    return true;
  }

  render() {
    const { topicItem } = this.props.entity;

    if (topicItem.isFetching || !topicItem.topic.topic_id) { return <View></View>; }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{topicItem.topic.content[0].infor}</Text>
      </View>
    );
  }
}
