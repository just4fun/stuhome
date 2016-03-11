import React, {
  Component,
  View
} from 'react-native';
import TopicList from './TopicList';

export default class ForumDetail extends Component {
  render() {
    return (
      <TopicList {...this.props} />
    );
  }
}
