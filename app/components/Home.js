import React, {
  Component,
  View
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from './Header';
import TopicList from './TopicList';

class Home extends Component {
  render() {
    return (
      <View style={mainStyles.container}>
        <Header title='最新' />
        <TopicList {...this.props} />
      </View>
    );
  }
}

module.exports = Home;
