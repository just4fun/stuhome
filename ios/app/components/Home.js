import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import TopicItem from './TopicItem';
import { fetchTopics } from '../actions/index';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export default class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics('new'));
  }

  render() {
    return (
      <ScrollView>
        {this.props.topics.map((topic) => <TopicItem key={topic.topic_id} topic={topic} />)}
      </ScrollView>
    );
  }
}
