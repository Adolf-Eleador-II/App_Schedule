// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SchedulePage from './src/page/SchedulePage';
import LessonPage from './src/page/LessonPage';
import SettingPage from './src/page/SettingPage';

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
        <Stack.Screen name='Schedule' component={SchedulePage} options={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true, autoHideHomeIndicator: true }} />
        <Stack.Screen name='Lesson' component={LessonPage} options={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true, autoHideHomeIndicator: true }} />
        <Stack.Screen name='Setting' component={SettingPage} options={{ headerShown: false, statusBarHidden: true, navigationBarHidden: true, autoHideHomeIndicator: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withExpoSnack(App);
// eas build --profile development --platform android
// npx expo run:android 