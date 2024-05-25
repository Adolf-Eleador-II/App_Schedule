import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ScheduleWidget } from './ScheduleWidget';
import * as LessonClass from '../Lesson'

const nameToWidget = {
  Schedule: ScheduleWidget,
};

const DayOfWeekName = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] as const;

export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {  
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[ widgetInfo.widgetName as keyof typeof nameToWidget ] as any;
  
  const today = new Date().getDay()-1;
  // let _;
  // const data: Lesson[] = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : [];
  // const dayLessons = data.filter((x: Lesson) => x?.day === today).sort( function (a,b) { return a.time[0] < b.time[0] ? 1 : -1; });
  
  const localLessonClass = new LessonClass.LessonList();
  await localLessonClass.load();
  const dayLessons = localLessonClass.getDayLessons(DayOfWeekName[today]);

  // console.log("Lesson debag:\n" + JSON.stringify(dayLessons, null, 2));

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_CLICK':
        props.renderWidget(<ScheduleWidget lessons={ dayLessons } dayName={ DayOfWeekName[today] }/>);
      break;
      
    case 'WIDGET_DELETED':
    default:
      break;
  }

}
