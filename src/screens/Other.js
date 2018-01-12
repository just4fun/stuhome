import { StackNavigator } from 'react-navigation';
import colors from '../styles/common/_colors';
import SettingsScreen from '../containers/Settings';
import InformationScreen from '../containers/Information';

const Other = StackNavigator({
  Settings: {
    screen: SettingsScreen
  },
  Information: {
    screen: InformationScreen
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
});

export default Other;
