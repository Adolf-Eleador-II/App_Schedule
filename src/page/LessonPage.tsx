import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Input from '../components/Input';
import Button from '../components/Button';

import { styled } from 'nativewind';
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

const dayNames=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

interface LessonPageProps {
  route: any;
  navigation: any;
}

export default function LessonPage({ route, navigation }: LessonPageProps) {
  const { lesson } = route.params;

  const [period, setPeriod] = useState<string>(lesson ? lesson.period.toString() : '');
  const [day, setDay] = useState<string>(lesson ? lesson.day.toString() : '');
  const [week, setWeek] = useState<string>(lesson ? lesson.week.toString() : '');
  const [name, setName] = useState<string>(lesson ? lesson.name : '');
  const [timeBegin, setTimeBegin] = useState<string>(lesson ? lesson.time[0] : '');
  const [timeEnd, setTimeEnd] = useState<string>(lesson ? lesson.time[1] : '');
  const [auditorium, setAuditorium] = useState<string>(lesson ? lesson.auditorium : '');
  const [teacher, setTeacher] = useState<string>(lesson ? lesson.teacher : '');
  
  const save = async () => {
    try {
      let _;
      let allLessons = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : [];
      
      const struct = {
        id: lesson ? Number(lesson.id) : allLessons.length,
        period: Number(period),
        day: Number(day),
        week: Number(week),
        name: name,
        auditorium: auditorium,
        teacher: teacher,
        time: [timeBegin, timeEnd],
      }
      
      if(lesson){
        allLessons[lesson.id]=struct;
      }
      else
      allLessons.push(struct);
        
      await AsyncStorage.setItem('lessons',JSON.stringify(allLessons));
    } catch (e) {
      alert('error\n'+e)
    }
    navigation.goBack();
  }
  const hidden = () => {
    // alert('You pressed a button hidden');
    navigation.goBack();
  }
  const edit = () => {
    // alert('You pressed a button edit');    
    navigation.goBack();
  }

  return (
    <StyledView className={'flex-1 flex-col justify-between space-y-3 p-3 border-8'+colorComponent.componentDark+colorComponent.borderBG}>
      <StyledView className='flex flex-row space-x-2'>
        <Button label="<-" action={() => {navigation.goBack()}}></Button>
        <StyledText className={'text-3xl'+colorText.textLight}>Занятие:</StyledText>
      </StyledView>

      <ScrollView><StyledView className={'flex-1 space-y-3'+colorComponent.componentDark}>
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
        <Button label="Сохранить" action={save}></Button>
        <Button label="Скрыть" action={hidden}></Button>
        <Button label="Изменить" action={edit}></Button>
      </StyledView>
    </StyledView>
  );
}


