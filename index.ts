import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { registerWidgetConfigurationScreen, registerWidgetTaskHandler, } from 'react-native-android-widget';
import App from './App';
import { WidgetTaskHandler } from './src/widget/WidgetTaskHandler';
import 'expo-dev-client';

registerRootComponent(App);
// AppRegistry.registerComponent('App_Schedule', () => App);
registerWidgetTaskHandler(WidgetTaskHandler);
