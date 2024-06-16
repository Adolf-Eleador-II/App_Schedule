// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import SchedulePage from './src/pages/SchedulePage';
import LessonPage from './src/pages/LessonPage';
import SettingPage from './src/pages/SettingPage';

import { withExpoSnack } from 'nativewind';
import NotificationsHandler from './src/notification/NotificationsHandler';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  NotificationsHandler();
  return (
    <NavigationContainer>
      <View style={{height: 20, backgroundColor: 'black'}}></View>
      <Stack.Navigator initialRouteName='Schedule'>
        <Stack.Screen name='Schedule' component={SchedulePage} options={{ headerShown: false }} />
        <Stack.Screen name='Lesson' component={LessonPage} options={{ headerShown: false }} />
        <Stack.Screen name='Setting' component={SettingPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// statusBarHidden: true, navigationBarHidden: true, autoHideHomeIndicator: true

export default withExpoSnack(App);
// eas build -p android --profile release_apk
// eas build -p android --profile development
