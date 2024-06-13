import React from 'react';
import { FlexWidget, ListWidget, TextWidget, requestWidgetUpdate } from 'react-native-android-widget';
import * as LessonClass from '../class/Lesson'

interface ScheduleWidgetProps {
  dayName: string,
  lessons?: LessonClass.Lesson[]
}

export async function widgetUpdate() {
  console.log('widget update')
  const today = new Date().getDay();
  
  const localLessonClass = new LessonClass.LessonClass();
  await localLessonClass.load();
  const dayLessons = localLessonClass.getDayLessons(LessonClass.DayOfWeekName[today], LessonClass.getIndexWeek());
  requestWidgetUpdate({
    widgetName: 'Schedule',
    renderWidget: () => <ScheduleWidget lessons={dayLessons} dayName={LessonClass.DayOfWeekName[today]} />,
    widgetNotFound: () => { }
  })
}

export function ScheduleWidget({ lessons = [], dayName }: ScheduleWidgetProps) {
  return (
      <ListWidget
        style={{ backgroundColor: '#374151', height: 'match_parent', width: 'match_parent' }}
      >
      <TextWidget text={`${dayName}`}
        style={{
          width: 'match_parent',
          textAlign: 'center',
          backgroundColor: '#374151',
          color: '#e5e7eb'
        }}/>
        {lessons.map((lesson: LessonClass.Lesson, i: number) => (
          <FlexWidget key={i}
            style={{
              width: 'match_parent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: 4,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              flexGap: 5
            }}>
              <TextWidget text={`${lesson.period}`} style={{ padding: 4, backgroundColor: '#4b5563', color:'#e5e7eb'}}/>
              <FlexWidget style={{ borderWidth: 1, height: 'match_parent', borderColor: '#e5e7eb' }}/>
              <FlexWidget style={{ flex: 1, flexDirection: 'column', width: 'match_parent', padding: 4, backgroundColor: '#4b5563'}}>
                <TextWidget text={`${lesson.name}`} style={{ color:'#e5e7eb'}}/>
                <FlexWidget style={{flex: 1, flexDirection: 'row', width: 'match_parent', justifyContent: 'space-between'}}>
                  <TextWidget text={`${lesson.auditorium}`} style={{ color:'#e5e7eb'}}/>
                  <TextWidget text={`${lesson.teacher}`} style={{ color:'#e5e7eb'}}/>
                </FlexWidget>
              </FlexWidget>

          </FlexWidget>
        ))}
      </ListWidget>
  );
}
