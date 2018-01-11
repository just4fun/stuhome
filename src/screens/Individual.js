import { StackNavigator } from 'react-navigation';
import colors from '../styles/common/_colors';
import IndividualScreen from '../containers/Individual';
import TopicScreen from '../containers/TopicDetail';
import PrivateMessageScreen from '../containers/PmList';
import WebViewScreen from '../containers/Browser';

const Individual = StackNavigator({
  Individual: {
    screen: IndividualScreen
  },
  Topic: {
    screen: TopicScreen
  },
  PrivateMessage: {
    screen: PrivateMessageScreen
  },
  WebView: {
    screen: WebViewScreen
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
});

export default Individual;
