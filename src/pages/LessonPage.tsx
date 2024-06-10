import React, { ReactNode, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as LessonClass from '../Lesson'

import { Button } from '../components/Button';
import { InputParameter } from '../components/Input';
import { SelectParameter } from '../components/Select';
import { AntDesign, Feather } from '@expo/vector-icons';

import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

interface LessonPageProps {
  route: any;
  navigation: any;
}

export default function LessonPage({ route, navigation }: LessonPageProps): ReactNode {
  const localLessonClass = new LessonClass.LessonList();
  const { thisLesson } = route.params;

  const [period, setPeriod] = useState<string>(thisLesson?.period.toString() ?? '1');
  const dayList = LessonClass.DayOfWeekName.map((x: string) => x);
  const [day, setDay] = useState<number>(thisLesson?.day ?? 1);
  const weekList = ['Неделя-1', 'Неделя-2'];
  const [week, setWeek] = useState<number>(thisLesson?.week ?? 0);
  const [name, setName] = useState<string>(thisLesson?.name ?? '');
  const [timeBegin, setTimeBegin] = useState<string>(thisLesson?.time[0] ?? '');
  const [timeEnd, setTimeEnd] = useState<string>(thisLesson?.time[1] ?? '');
  const [auditorium, setAuditorium] = useState<string>(thisLesson?.auditorium ?? '');
  const [teacher, setTeacher] = useState<string>(thisLesson?.teacher ?? '');
  const [hidden, setHidden] = useState<boolean>(thisLesson?.hidden ?? false)
  const [notification, setNotification] = useState<boolean>(thisLesson?.notification ?? true)

  const saveLesson = async () => {
    const lesson = {
      period: Number(period),
      day: day,
      week: week,
      name: name,
      auditorium: auditorium,
      teacher: teacher,
      time: [timeBegin, timeEnd],
      hidden: hidden,
      notification: notification,
    } as LessonClass.Lesson;

    await localLessonClass.replace(thisLesson, lesson);
    navigation.goBack();
  }
  const deleteLesson = async () => {
    await localLessonClass.remove(thisLesson);
    navigation.goBack();
    }
  const hiddenChange = () => {
      setHidden(!hidden);
  }
  const notificationChange = () => {
    setNotification(!notification);
  }

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row space-x-2'>
        <Button onPress={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={19} color='white' /></Button>
        <StyledText className={'text-3xl text-white'}>Занятие:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-3 bg-gray-700'}>
        <StyledView className='flex space-y-1'>
          <StyledView><InputParameter label={'Пара'} value={period} onChange={setPeriod} /></StyledView>
          <StyledView>
            <SelectParameter
              label='День'
              options={dayList}
              defaultIndex={day}
              onSelect={setDay}
            />
          </StyledView>
          <StyledView><InputParameter label={'Название предмета'} value={name} onChange={setName} /></StyledView>
          <StyledView><InputParameter label={'Кабинет'} value={auditorium} onChange={setAuditorium} /></StyledView>
          <StyledView><InputParameter label={'Имя преподвавтеля'} value={teacher} onChange={setTeacher} /></StyledView>
        </StyledView>
        <StyledView className='flex space-y-1'>
          <StyledView>
            <SelectParameter
              label='Неделя'
              options={weekList}
              defaultIndex={week}
              onSelect={setWeek}
            />
          </StyledView>
          <StyledView><InputParameter label={'Начало'} value={timeBegin} onChange={setTimeBegin} /></StyledView>
          <StyledView><InputParameter label={'Конец'} value={timeEnd} onChange={setTimeEnd} /></StyledView>
          {/* <StyledView><Input label={'Уведомлять за'} value={Period} action={setPeriod} /></StyledView> */}
        </StyledView>
        {/* <StyledView className='flex space-y-1'> */}
        {/* <StyledView><Input label={'Цвет'} value={Period} action={setPeriod} /></StyledView> */}
        {/* <StyledView><Input label={'Заметка'} value={Period} action={setPeriod} /></StyledView> */}
        {/* </StyledView> */}
        <StyledView className='flex flex-row justify-between space-x-2'>
        <Button onPress={hiddenChange}><Feather name={ hidden ? 'eye-off' : 'eye'} size={19} color='white' /></Button>
        <Button onPress={notificationChange}><Feather name={ notification ? 'bell' : 'bell-off'} size={19} color='white' /></Button>
        </StyledView>
      </StyledView></ScrollView>

      <StyledView className='flex flex-row justify-between space-x-2'>
        <Button onPress={saveLesson}><Feather name='save' size={19} color='white' /></Button>
        <Button onPress={deleteLesson}><AntDesign name='delete' size={19} color='white' /></Button>
      </StyledView>
    </StyledView>
  );
}