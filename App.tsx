// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SchedulePage from './src/pages/SchedulePage';
import LessonPage from './src/pages/LessonPage';
import SettingPage from './src/pages/SettingPage';

import { withExpoSnack } from 'nativewind';
import NotificationsPage from './src/notification/NotificationsPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Schedule'>
        <Stack.Screen name='Schedule' component={SchedulePage} options={{ headerShown: false }} />
        <Stack.Screen name='Lesson' component={LessonPage} options={{ headerShown: false }} />
        <Stack.Screen name='Setting' component={SettingPage} options={{ headerShown: false }} />
        <Stack.Screen name='Notifications' component={NotificationsPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// statusBarHidden: true, navigationBarHidden: true, autoHideHomeIndicator: true

export default withExpoSnack(App);
// eas build -p android
// eas build -p android --profile release_apk
// eas build --profile development --platform android
// npx expo run:android
