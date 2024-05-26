import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as LessonClass from '../Lesson'

import Input from '../components/Input';
import Button from '../components/Button';

import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

const colorText = {
  textLight: ' text-white',
  textDark: ' text-black',
};
const colorComponent = {
  componentDark: ' bg-gray-700',
  componentLight: ' bg-gray-200',
  borderLight: ' border-gray-200',
  componentBG: ' bg-gray-600',
  borderBG: ' border-gray-600',
};

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface LessonPageProps {
  route: any;
  navigation: any;
}

export default function LessonPage({ route, navigation }: LessonPageProps) {
  const localLessonClass = new LessonClass.LessonList();
  const { thisLesson } = route.params;

  const [period, setPeriod] = useState<string>(thisLesson ? thisLesson.period.toString() : '');
  const [day, setDay] = useState<string>(thisLesson ? thisLesson.day.toString() : '');
  const [week, setWeek] = useState<string>(thisLesson ? thisLesson.week.toString() : '');
  const [name, setName] = useState<string>(thisLesson ? thisLesson.name : '');
  const [timeBegin, setTimeBegin] = useState<string>(thisLesson ? thisLesson.time[0] : '');
  const [timeEnd, setTimeEnd] = useState<string>(thisLesson ? thisLesson.time[1] : '');
  const [auditorium, setAuditorium] = useState<string>(thisLesson ? thisLesson.auditorium : '');
  const [teacher, setTeacher] = useState<string>(thisLesson ? thisLesson.teacher : '');

  const saveLesson = async () => {
    const lesson = {
          period: Number(period),
          day: Number(day),
          week: Number(week),
          name: name,
          auditorium: auditorium,
          teacher: teacher,
          time: [timeBegin, timeEnd],
    } as LessonClass.Lesson;

    await localLessonClass.replace(thisLesson, lesson);
    navigation.goBack();
  }
  const hiddenLesson = () => {
    navigation.goBack();
  }
  const deleteLesson = async () => {
    await localLessonClass.delete(thisLesson);
    navigation.goBack();
  }

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8' + colorComponent.componentDark + colorComponent.borderBG}>
      <StyledView className='flex flex-row space-x-2'>
        <Button label="<-" action={() => { navigation.goBack() }}></Button>
        <StyledText className={'text-3xl' + colorText.textLight}>Занятие:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-3' + colorComponent.componentDark}>
        <StyledView className='flex space-y-1'>
          <StyledView><Input label={'Пара'} value={period} action={setPeriod}></Input></StyledView>
          <StyledView><Input label={'День'} value={day} action={setDay}></Input></StyledView>
          <StyledView><Input label={'Название предмета'} value={name} action={setName}></Input></StyledView>
          <StyledView><Input label={'Кабинет'} value={auditorium} action={setAuditorium} ></Input></StyledView>
          <StyledView><Input label={'Имя преподвавтеля'} value={teacher} action={setTeacher} ></Input></StyledView>
        </StyledView>
        <StyledView className='flex space-y-1'>
          <StyledView><Input label={'Неделя'} value={week} action={setWeek}></Input></StyledView>
          <StyledView><Input label={'Начало'} value={timeBegin} action={setTimeBegin} ></Input></StyledView>
          <StyledView><Input label={'Конец'} value={timeEnd} action={setTimeEnd} ></Input></StyledView>
          {/* <StyledView><Input label={'Уведомлять за'} value={Period} action={setPeriod} ></Input></StyledView> */}
        </StyledView>
        {/* <StyledView className='flex space-y-1'> */}
        {/* <StyledView><Input label={'Цвет'} value={Period} action={setPeriod} ></Input></StyledView> */}
        {/* <StyledView><Input label={'Заметка'} value={Period} action={setPeriod} ></Input></StyledView> */}
        {/* </StyledView> */}
      </StyledView></ScrollView>

      <StyledView className='flex flex-row justify-between space-x-2'>
        <Button label="Сохранить" action={saveLesson}></Button>
        <Button label="Скрыть" action={hiddenLesson}></Button>
        <Button label="Удалить" action={deleteLesson}></Button>
      </StyledView>
    </StyledView>
  );
}


