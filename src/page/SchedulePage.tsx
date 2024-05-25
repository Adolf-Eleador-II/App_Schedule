import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import * as LessonClass from '../Lesson'

import Card from '../components/Card';
import Button from '../components/Button';

import { StyledComponent, styled } from 'nativewind';
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

export default function SchedulePage({ navigation }: any) {
  const localLessonClass = new LessonClass.LessonList();
  const [lessons, setLessons] = useState<LessonClass.LessonsDay[]>([]);

  const load = async () => {
    await localLessonClass.load();
    setLessons(localLessonClass.getWeekLessons());
  }

  const loadDefault = () => {
    localLessonClass.loadDefault();
    setLessons(localLessonClass.getWeekLessons());
  }

  const otherButton = () => {
    // AsyncStorage.clear();
  }

  useFocusEffect(useCallback(() => { load() }, []));
  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8' + colorComponent.componentDark + colorComponent.borderBG}>
      <StyledView className='flex flex-row justify-between space-x-2'>
        <StyledText className={'text-3xl' + colorText.textLight}>Расписание:</StyledText>
        <Button label="+" action={() => { navigation.navigate('Lesson', {}) }}></Button>
      </StyledView>

      <ScrollView>
        {lessons.map((x: LessonClass.LessonsDay) => <ScheduleForDay key={x.name} dayOfWeekName={x.name} dayLessonList={x.lessons} navigation={navigation} />)}
      </ScrollView>

      <StyledView className='flex flex-row items-stretch justify-between space-x-2'>
        <Button label="Загрузить" action={load}></Button>
        <Button label="Загрузить заготовку" action={loadDefault}></Button>
        <Button label="*_*" action={otherButton}></Button>
      </StyledView>

    </StyledView>
  )
}

interface ScheduleForDayProps {
  dayOfWeekName: LessonClass.DayOfWeekNameType;
  dayLessonList: LessonClass.Lesson[];
  navigation: any;
}

function ScheduleForDay({ dayOfWeekName, dayLessonList, navigation }: ScheduleForDayProps) {
  if (dayLessonList.length !== 0)
    return (
      <StyledView className='flex space-y-1'>
        <StyledText className={'text-2xl' + colorText.textLight}>{dayOfWeekName}:</StyledText>
        {dayLessonList.map((lesson: LessonClass.Lesson, i: number) =>
          <StyledView key={i}><Card key={lesson.period} lesson={lesson} action={() => { navigation.navigate('Lesson', { thisLesson: lesson }) }} /></StyledView>
        )}
      </StyledView>
    );
}
