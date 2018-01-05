import { StackNavigator } from 'react-navigation';
import colors from '../styles/common/_colors';
import HomeScreen from '../containers/Home';
import TopicScreen from '../containers/TopicDetail';

const Home = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Topic: {
    screen: TopicScreen
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
});

export default Home;
