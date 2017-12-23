// make `Symbol` available on iOS 8
import 'es6-symbol/implement';

import { AppRegistry } from 'react-native';
import App from './src/containers/App';

AppRegistry.registerComponent('stuhome', () => App);
