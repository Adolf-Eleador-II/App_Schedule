import React from 'react';
import { FlexWidget, IconWidget, ListWidget, TextWidget } from 'react-native-android-widget';
import type { Lesson } from '../Lesson'

interface ScheduleWidgetProps {
  dayName: string,
  lessons?: Lesson[]
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
        {lessons.map((lesson: Lesson, i: number) => (
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
              <TextWidget text={`${lesson.period}`} style={{ padding: 4, backgroundColor: '#4b5563', color:'#e5e7eb'}} />
              <FlexWidget style={{ borderWidth: 1, height: 'match_parent', borderColor: '#e5e7eb' }}/>
              <TextWidget text={`${lesson.name}`} style={{ padding: 4, backgroundColor: '#4b5563', color:'#e5e7eb'}}/>
          </FlexWidget>
        ))}
      </ListWidget>
  );
}
