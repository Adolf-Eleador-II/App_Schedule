import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import App from './App';
import { WidgetTaskHandler } from './src/widget/WidgetTaskHandler';
import 'expo-dev-client';

registerRootComponent(App);
registerWidgetTaskHandler(WidgetTaskHandler);