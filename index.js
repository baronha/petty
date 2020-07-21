/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './src/utils/i18n';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
