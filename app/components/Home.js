import React, {
  Component,
  View
} from 'react-native';
import TopicList from './TopicList';

export default class Home extends Component {
  render() {
    return (
      <TopicList {...this.props} />
    );
  }
}
