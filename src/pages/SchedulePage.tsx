import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as LessonClass from '../Lesson'

import Card from '../components/Card';
import { Button, ButtonText } from '../components/Button';
import { Select } from '../components/Select';

import { styled } from 'nativewind';
import { AntDesign, Feather } from '@expo/vector-icons';
import { widgetUpdate } from '../widget/ScheduleWidget';
const StyledView = styled(View)
const StyledText = styled(Text)

export default function SchedulePage({ navigation }: any): ReactNode {
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

  useFocusEffect(useCallback(() => { load(); widgetUpdate(); },[weekIndex]));
  
  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'}>
      <StyledView className='flex flex-row justify-between space-x-2'>
        <StyledText className={'text-3xl text-white'}>Расписание:</StyledText>
        <StyledView><Select options={weekList} onSelect={setWeekIndex} defaultIndex={weekIndex}/></StyledView>
        <Button onPress={() => { navigation.navigate('Lesson', {}) }}><Feather name='plus' size={19} color="white" /></Button>
      </StyledView>

      <ScrollView>
        {lessons.map((x: LessonClass.LessonsDay) =>{
        return <ScheduleForDay key={x.name} dayOfWeekName={x.name} dayLessonList={x.lessons} navigation={navigation} />
      })}
      </ScrollView>

      <StyledView className='flex flex-row items-stretch justify-between space-x-2'>
        <ButtonText name={"Загрузить"} onPress={load}/>
        <ButtonText name={"Загрузить заготовку"} onPress={loadDefault}/>
        <Button onPress={otherButton}><AntDesign name='setting' size={19} color="white"/></Button>
      </StyledView>

    </StyledView>
  )
}

interface ScheduleForDayProps {
  dayOfWeekName: LessonClass.DayOfWeekNameType;
  dayLessonList: LessonClass.Lesson[];
  navigation: any;
}

function ScheduleForDay({ dayOfWeekName, dayLessonList, navigation }: ScheduleForDayProps): ReactNode {
  if (dayLessonList.length !== 0)
    return (
      <StyledView className='flex space-y-1'>
        <StyledText className={'text-2xl text-white'}>{dayOfWeekName}:</StyledText>
        {dayLessonList.map((lesson: LessonClass.Lesson, i: number) =>
          <StyledView key={i}><Card key={lesson.period} lesson={lesson} onPress={() => { navigation.navigate('Lesson', { thisLesson: lesson }) }} /></StyledView>
        )}
      </StyledView>
    );
}
