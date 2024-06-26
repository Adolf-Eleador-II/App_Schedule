import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as LessonClass from '../class/LessonsClass'

import { Button, ButtonText } from '../components/Button';
import { InputParameter } from '../components/Input';
import { SelectLabel } from '../components/Select';

import { styled } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from '../notification/ScheduleNotifications';

const StyledView = styled(View)
const StyledText = styled(Text)


export default function SettingPage({ navigation }: any) {
  const localLessonsClass = new LessonClass.LessonsClass();
  const [countWeek, setCountWeek] = useState<string>('2');
  const weekList = ['Неделя-1', 'Неделя-2'];
  const [weekIndex, setWeekIndex] = useState<number>(1);

  const loadDefault = () => {
    localLessonsClass.loadDefault();
  }
  const deleteLessons = async () => {
    await localLessonsClass.removeAll();
    await Notifications.cancelAllPushNotification();
  }
  const notificationOffLessons = async () => {
    localLessonsClass.allNotificationOff();
    await Notifications.cancelAllPushNotification();
  }

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row items-center space-x-2'>
        <Button onPress={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={23} color="white" /></Button>
        <StyledText className={'text-3xl text-white'}>Настройки:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-5 bg-gray-700'}>

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
          <StyledView><ButtonText name={"Отчистить расписание"} onPress={deleteLessons} /></StyledView>
          <StyledView><ButtonText name={"Отменить все уведомления"} onPress={notificationOffLessons} /></StyledView>
        </StyledView>

        {/* <StyledView className='flex space-y-1'>
          <StyledView><InputParameter label={'Количество недель'} value={countWeek} onChange={setCountWeek} /></StyledView>
          <StyledView><SelectLabel
              label='Текущая неделя'
              options={weekList}
              defaultIndex={weekIndex}
              onSelect={setWeekIndex}
            /></StyledView>
        </StyledView> */}


      </StyledView></ScrollView>

    </StyledView>
  )
}
