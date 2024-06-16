import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, ReactNode } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as LessonClass from '../class/LessonsClass'

import Card from '../components/Card';
import { Button, ButtonText } from '../components/Button';
import { SelectValueLabel } from '../components/Select';

import { styled } from 'nativewind';
import { AntDesign, Feather } from '@expo/vector-icons';
import { widgetUpdate } from '../widget/ScheduleWidget';
import { getIndexWeek } from '../getIndexWeek';
const StyledView = styled(View)
const StyledText = styled(Text)

export default function SchedulePage({ navigation }: any): ReactNode {
  const localLessonsClass = new LessonClass.LessonsClass();
  const [lessons, setLessons] = useState<LessonClass.LessonsDay[]>([]);
  const weekList = ['Неделя-1', 'Неделя-2'];
  const [weekIndex, setWeekIndex] = useState<number>(getIndexWeek() - 1);

  const load = async () => {
    await localLessonsClass.load();
    setLessons(localLessonsClass.getWeekLessons(weekIndex + 1));
  }

  useFocusEffect(useCallback(() => { load(); widgetUpdate(); }, [weekIndex]));

  return (
    <StyledView className='flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'>
      <StyledView className='flex flex-row justify-between items-center space-x-2'>
        <StyledText className='text-3xl text-white'>Расписание:</StyledText>
        <StyledView className='flex flex-row space-x-2'>
          <StyledView><SelectValueLabel options={weekList} onSelect={setWeekIndex} defaultIndex={weekIndex} /></StyledView>
          <StyledView><Button onPress={() => { navigation.navigate('Lesson', {}) }}><Feather name='plus' size={23} color="white" /></Button></StyledView>
          <StyledView><Button onPress={() => { navigation.navigate('Setting') }}><AntDesign name='setting' size={23} color="white" /></Button></StyledView>
        </StyledView>
      </StyledView>

      <ScrollView >
        {lessons.map((x: LessonClass.LessonsDay, i: number) => {
          return <ScheduleForDay key={x.name} dayOfWeek={i} dayLessonList={x.lessons} navigation={navigation} hiddenOff={x.hiddenOff} />
        })}
      </ScrollView>

    </StyledView>
  )
}

interface ScheduleForDayProps {
  dayOfWeek: number;
  dayLessonList: LessonClass.Lesson[];
  navigation: any;
  hiddenOff: boolean;
}

function ScheduleForDay({ dayOfWeek, dayLessonList, navigation, hiddenOff }: ScheduleForDayProps): ReactNode {
  const [hidden, setHidden] = useState<boolean>(hiddenOff)
  const hiddenChange = () => {
    setHidden(!hidden);
  }
  let countHidden = 0;
  dayLessonList.map((x) => { if (x.hidden) countHidden++ })
  const buttonHide = (countHidden > 0)
    ? <Pressable onPress={hiddenChange}><Feather name={hidden ? 'eye' : 'eye-off'} size={23} color='white' /></Pressable>
    : [];
  if (dayLessonList.length != 0)
    return (
      <StyledView className='flex space-y-1 mt-3'>
        <StyledView className='flex flex-row items-center justify-between space-x-2'>
          <StyledText className='text-2xl text-white'>{LessonClass.DayOfWeekName[dayOfWeek]}:</StyledText>
          <StyledView className='flex flex-row space-x-2'>
            {buttonHide}
            {/* <Pressable onPress={() => { navigation.navigate('Lesson', { thisLesson: {day: dayOfWeek} as LessonClass.Lesson }) }}><Feather name='plus' size={23} color="white" /></Pressable> */}
          </StyledView>
        </StyledView>
        {dayLessonList.map((lesson: LessonClass.Lesson, i: number) => {
          if (!lesson.hidden || hidden)
            return <StyledView key={i}><Card key={lesson.period} lesson={lesson} onPress={() => { navigation.navigate('Lesson', { thisLesson: lesson }) }} /></StyledView>
        }
        )}
      </StyledView>
    );
}
