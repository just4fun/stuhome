import { StackNavigator } from 'react-navigation';
import colors from '../styles/common/_colors';
import AboutScreen from '../containers/About';
import PrivateMessageScreen from '../containers/PmList';

const About = StackNavigator({
  About: {
    screen: AboutScreen
  },
  PrivateMessage: {
    screen: PrivateMessageScreen
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
});

export default About;
