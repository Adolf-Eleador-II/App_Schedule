import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as LessonClass from '../class/Lesson'

import { Button, ButtonText } from '../components/Button';
import { InputParameter } from '../components/Input';
import { SelectLabel } from '../components/Select';

import { styled } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from '../notification/ScheduleNotifications';

const StyledView = styled(View)
const StyledText = styled(Text)


export default function SettingPage({ navigation }: any) {
  const localLessonClass = new LessonClass.LessonClass();

  const loadDefault = () => {
    localLessonClass.loadDefault();
  }
  const deleteLessons = async () => {
    await localLessonClass.removeAll();
    await Notifications.cancelAllPushNotification();
  }
  const notificationOffLessons = async () => {
    localLessonClass.allNotificationOff();
    await Notifications.cancelAllPushNotification();
  }

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row space-x-2'>
        <Button onPress={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={19} color="white" /></Button>
        <StyledText className={'text-3xl text-white'}>Настройки:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-3 bg-gray-700'}>

        {/* <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name={"Экспорт"} onPress={() => { return 0 }} /></StyledView>
          <StyledView><ButtonText name={"Импорт"} onPress={() => { return 0 }} /></StyledView>
        </StyledView> */}

        {/* <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name="Отменить все уведомления log" onPress={async () => { await Notifications.cancelAllPushNotification(); }}/></StyledView>
          <StyledView><ButtonText name="Показать все уведомления log" onPress={async () => { await Notifications.getAllPushNotification(); }}/></StyledView>
        </StyledView> */}

        <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name={"Загрузить заготовку"} onPress={loadDefault} /></StyledView>
          <StyledView><ButtonText name={"Сброс расписания"} onPress={deleteLessons} /></StyledView>
          <StyledView><ButtonText name={"Отменить все уведомления"} onPress={notificationOffLessons} /></StyledView>
        </StyledView>




      </StyledView></ScrollView>

    </StyledView>
  )
}
