import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';

import Card from '../components/Card';
import Button from '../components/Button';

import { StyledComponent, styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

const colorText={
  textLight: ' text-white',
  textDark: ' text-black',
};
const colorComponent={
  componentDark: ' bg-gray-700',
  componentLight: ' bg-gray-200',
  borderLight: ' border-gray-200',
  componentBG: ' bg-gray-600',
  borderBG: ' border-gray-600',
};

type DayOfWeekNameType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface Lesson {
  // id: number;
  period: number;
  day: number;
  week: number;
  time: [ string, string ];
  name: string;
  auditorium: string;
  teacher: string;
}

interface Lessons {
  name: DayOfWeekNameType;
  lessons: Lesson[];
}

interface ScheduleForDayProps {
  dayOfWeekName: DayOfWeekNameType;
  dayLessonList: Lesson[];
  navigation: any;
}

export default function SchedulePage({ navigation }:any) {
  const [lessons, setLessons] = useState<any>([]);

  const repackData = (data: Lesson[]) => 
    ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((dayName, day) => ({
      name: dayName,
      lessons: getLessonForWeekDay(data, day)
  }));
  
  const loadAll = async () => {
    try {
      let _;
      const data = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : [];
      setLessons(repackData(data))
    } catch (e) {
      alert('error\n'+e)
    }
  }

  const loadDefault = () => {
    setLessons(repackData(lessonsDefault));
  }

  const otherButton = async () => {
    AsyncStorage.clear();
  }

  useFocusEffect( React.useCallback(() => { loadAll() },[]));

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8'+colorComponent.componentDark+colorComponent.borderBG}>
      <StyledView className='flex flex-row justify-between space-x-2'>
        <StyledText className={'text-3xl'+colorText.textLight}>Расписание:</StyledText>
        <Button label="+" action={() => {navigation.navigate('Lesson', {})}}></Button>
      </StyledView>

      <ScrollView>
        {lessons.map((x: Lessons) => <ScheduleForDay key={x.name} dayOfWeekName={x.name} dayLessonList={x.lessons} navigation={navigation}/>)}
      </ScrollView>

      <StyledView className='flex flex-row items-stretch justify-between space-x-2'>
        <Button label="Загрузить" action={loadAll}></Button>
        <Button label="Загрузить заготовку" action={loadDefault}></Button>
        <Button label="*_*" action={otherButton}></Button>
      </StyledView>
       
    </StyledView>
  )
}

function ScheduleForDay({dayOfWeekName, dayLessonList, navigation}:ScheduleForDayProps) {
  if(dayLessonList.length !== 0)
  return (
    <StyledView className='flex space-y-1'>
      <StyledText className={'text-2xl'+colorText.textLight}>{dayOfWeekName}:</StyledText>
      {dayLessonList.map((lesson: Lesson, i: number) =>
        <StyledView key={i}><Card key={lesson.period} lesson={lesson} action={() => {navigation.navigate('Lesson',{lesson: lesson})}}/></StyledView>
      )}
    </StyledView>
  );
}

const getLessonForWeekDay = (lessons: Lesson[], weekDayNum: number) =>
  lessons.map((x,i) => ({ id: i,...x }))
  .filter(x => x.day === weekDayNum)
  .sort( function (a,b) { return a.time[0] < b.time[0] ? 1 : -1; });

const lessonsDefault = [
  {
    // id: 1,
    period: 2,
    day: 0,
    week: 0,
    time: ['10:00','11:20'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    // id: 2,
    period: 3,
    day: 0,
    week: 0,
    time: ['11:30','12:50'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    // id: 3,
    period: 1,
    day: 1,
    week: 0,
    time: ['8:30','9:50'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    // id: 4,
    period: 2,
    day: 1,
    week: 0,
    time: ['10:00','11:20'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    // id: 5,
    period: 4,
    day: 2,
    week: 0,
    time: ['13:20','14:40'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У106',
    teacher: ''
  },
  {
    // id: 6,
    period: 5,
    day: 2,
    week: 0,
    time: ['14:50','16:10'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    // id: 7,
    period: 2,
    day: 3,
    week: 0,
    time: ['10:00','11:20'],
    name: 'ФДТ: Основы подготовки технической документации (пр)',
    auditorium: 'У408',
    teacher: ''
  },
  {
    // id: 8,
    period: 3,
    day: 3,
    week: 0,
    time: ['11:30','12:50'],
    name: 'Система управления мехатронными комплексами (лаб)',
    auditorium: 'У403',
    teacher: ''
  },
  {
    // id: 9,
    period: 4,
    day: 3,
    week: 0,
    time: ['13:20','14:40'],
    name: 'Технологии мультимедиа (лаб)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    // id: 10,
    period: 2,
    day: 4,
    week: 0,
    time: ['10:00','11:20'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    // id: 11,
    period: 3,
    day: 4,
    week: 0,
    time: ['11:30','12:50'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    // id: 12,
    period: 2,
    day: 5,
    week: 0,
    time: ['10:00','11:20'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
  {
    // id: 13,
    period: 3,
    day: 5,
    week: 0,
    time: ['11:30','12:50'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
] as Lesson[]
