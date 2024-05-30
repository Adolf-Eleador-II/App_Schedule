// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SchedulePage from './src/pages/SchedulePage';
import LessonPage from './src/pages/LessonPage';
import SettingPage from './src/pages/SettingPage';

import Notifications from './src/notification/Notifications';

import { ScheduleWidget } from './src/widget/ScheduleWidget';
import { WidgetPreview } from 'react-native-android-widget';

import { withExpoSnack } from 'nativewind';
import { styled } from 'nativewind';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <Notifications></Notifications>

    <NavigationContainer>
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
// eas build --profile development --platform android
// npx expo run:android
