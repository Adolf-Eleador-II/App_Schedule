import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { registerWidgetConfigurationScreen, registerWidgetTaskHandler } from 'react-native-android-widget';
import App from './App';
import { WidgetTaskHandler } from './src/widget/WidgetTaskHandler';
import { WidgetConfigurationScreen } from './src/widget/WidgetConfigurationScreen';
import 'expo-dev-client';

registerRootComponent(App);
registerWidgetTaskHandler(WidgetTaskHandler);
// registerWidgetConfigurationScreen(WidgetConfigurationScreen);
