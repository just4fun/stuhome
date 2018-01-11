import { StackNavigator } from 'react-navigation';
import colors from '../styles/common/_colors';
import ForumListScreen from '../containers/ForumList';
import ForumScreen from '../containers/ForumDetail';
import TopicScreen from '../containers/TopicDetail';
import IndividualScreen from '../containers/Individual';
import PrivateMessageScreen from '../containers/PmList';
import WebViewScreen from '../containers/Browser';

const ForumList = StackNavigator({
  ForumList: {
    screen: ForumListScreen
  },
  Forum: {
    screen: ForumScreen
  },
  Topic: {
    screen: TopicScreen
  },
  Individual: {
    screen: IndividualScreen
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

export default ForumList;
