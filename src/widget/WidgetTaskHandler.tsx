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
  const dayLessons = data.filter((x: Lesson) => x?.day === today).sort( function (a,b) { return a.time[0] < b.time[0] ? 1 : -1; });

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
