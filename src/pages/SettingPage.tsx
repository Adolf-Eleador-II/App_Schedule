import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as LessonClass from '../Lesson'

import { Button, ButtonText } from '../components/Button';
import { InputParameter } from '../components/Input';
import { SelectLabel } from '../components/Select';

import { styled } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from '../notification/ScheduleNotifications';

const StyledView = styled(View)
const StyledText = styled(Text)

const deleteLessons = async () => {
  const localLessonClass = new LessonClass.LessonList();
  await localLessonClass.removeAll();
}

export default function SettingPage({ navigation }: any) {
  const [text1, setText1] = useState<string>('Text1');
  const [text2, setText2] = useState<number>(0);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row space-x-2'>
        <Button onPress={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={19} color="white" /></Button>
        <StyledText className={'text-3xl text-white'}>Настройки:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-3 bg-gray-700'}>
        
        <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name={"Экспорт"} onPress={() => { return 0 }} /></StyledView>
          <StyledView><ButtonText name={"Импорт"} onPress={() => { return 0 }} /></StyledView>
        </StyledView>
        
        <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name="Отменить все уведомления" onPress={async () => { await Notifications.cancelAllPushNotification(); }}/></StyledView>
          <StyledView><ButtonText name="Показать все уведомления" onPress={async () => { await Notifications.getAllPushNotification(); }}/></StyledView>
        </StyledView>
        
        <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name={"Сброс расписания"} onPress={deleteLessons} /></StyledView>
        </StyledView>
        
        <StyledView className='flex space-y-1'>
          <StyledView><InputParameter label='День' value={text1} onChange={setText1} /></StyledView>
          <StyledView>
            <SelectLabel
              label='Неделя'
              options={LessonClass.DayOfWeekName.map((x: string) => x)}
              onSelect={setText2}
              />
          </StyledView>
          <StyledView><StyledText className='text-1xl text-white'>{text2}</StyledText></StyledView>
        </StyledView>
        
        <StyledView className='flex space-y-1'>
          <StyledView><ButtonText name={"Указать время"} onPress={() => showDatePicker()} /></StyledView>
          <StyledView>


          
          </StyledView>
          <StyledView><StyledText className='text-1xl text-white' >{""+date}</StyledText></StyledView>
        </StyledView>

      </StyledView></ScrollView>

    </StyledView>
  )
}