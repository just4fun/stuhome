import React, {
  Component,
  View,
  Text
} from 'react-native';
import styles from '../styles/components/_TopicDetail';

export default class TopicDetail extends Component {
  render() {
    const topic = this.props.passProps;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{topic.subject}</Text>
      </View>
    );
  }
}
