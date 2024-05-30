import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import * as LessonClass from '../Lesson'

import Card from '../components/Card';
import { Button, ButtonText } from '../components/Button';
import { Select } from '../components/Select';

import { StyledComponent, styled } from 'nativewind';
import { AntDesign, Feather } from '@expo/vector-icons';
const StyledView = styled(View)
const StyledText = styled(Text)

export default function SchedulePage({ navigation }: any) {
  const localLessonClass = new LessonClass.LessonList();
  const [lessons, setLessons] = useState<LessonClass.LessonsDay[]>([]);

  const weekList = ['Неделя-1','Неделя-2'];
  const [weekIndex, setWeekIndex] = useState<number>(LessonClass.getIndexWeek());

  const load = async () => {
    await localLessonClass.load();
    setLessons(localLessonClass.getWeekLessons(weekIndex));
  }

  const loadDefault = () => {
    localLessonClass.loadDefault();
    setLessons(localLessonClass.getWeekLessons(weekIndex));
  }

  const otherButton = () => {
    navigation.navigate('Setting');
  }

  useFocusEffect(useCallback(() => { load() }, [weekIndex]));
  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row justify-between space-x-2'>
        <StyledText className={'text-3xl text-white'}>Расписание:</StyledText>
        <StyledView><Select options={weekList} action={setWeekIndex} defaultIndex={weekIndex}/></StyledView>
        <Button action={() => { navigation.navigate('Lesson', {}) }}><Feather name='plus' size={19} color="white" /></Button>
      </StyledView>

      <ScrollView>
        {lessons.map((x: LessonClass.LessonsDay) => <ScheduleForDay key={x.name} dayOfWeekName={x.name} dayLessonList={x.lessons} navigation={navigation} />)}
      </ScrollView>

      <StyledView className='flex flex-row items-stretch justify-between space-x-2'>
        <ButtonText name={"Загрузить"} action={load}/>
        <ButtonText name={"Загрузить заготовку"} action={loadDefault}/>
        <Button action={otherButton}><AntDesign name='setting' size={19} color="white"/></Button>
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
        <StyledText className={'text-2xl text-white'}>{dayOfWeekName}:</StyledText>
        {dayLessonList.map((lesson: LessonClass.Lesson, i: number) =>
          <StyledView key={i}><Card key={lesson.period} lesson={lesson} action={() => { navigation.navigate('Lesson', { thisLesson: lesson }) }} /></StyledView>
        )}
      </StyledView>
    );
}
