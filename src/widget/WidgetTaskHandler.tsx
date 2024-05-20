import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ScheduleWidget } from './ScheduleWidget';

const nameToWidget = {
  Schedule: ScheduleWidget,
};

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

const DayOfWeekName = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const COUNTER_STORAGE_KEY = 'CounterWidget:count';

export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[ widgetInfo.widgetName as keyof typeof nameToWidget ] as any;
  let count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);  
  
  const today = new Date().getDay()-1;
  let _;
  const data: Lesson[] = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : [];
  const dayLessons = data.filter((x: Lesson) => x?.day === today);

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
        props.renderWidget(<ScheduleWidget lessons={ dayLessons } dayName={ DayOfWeekName[today] }/>);
      break;
      

    case 'WIDGET_DELETED':
    case 'WIDGET_CLICK':
      break;

    default:
      break;
  }

}


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


// export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {
//   const widgetInfo = props.widgetInfo;
//   const Widget = nameToWidget[ widgetInfo.widgetName as keyof typeof nameToWidget ] as any;
//   let count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);  

//   switch (props.widgetAction) {
//     case 'WIDGET_RESIZED':
//     case 'WIDGET_ADDED':
//         props.renderWidget(<ScheduleWidget count={count}/>);
//       break;
      
//     case 'WIDGET_UPDATE':
//         count += 1;
//         props.renderWidget(<ScheduleWidget count={count}/>);
//         AsyncStorage.setItem(COUNTER_STORAGE_KEY, `${count}`);
//       break;

//     case 'WIDGET_DELETED':
//       break;

//     case 'WIDGET_CLICK':
//         count = +(props.clickActionData?.value as number) + (props.clickAction === 'INCREMENT' ? 1 : -1);
//         props.renderWidget(<ScheduleWidget count={count}/>);
//         AsyncStorage.setItem(COUNTER_STORAGE_KEY, `${count}`);
//       break;

//     default:
//       break;
//   }
// }
