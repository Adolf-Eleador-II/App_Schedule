import React from 'react';
import { FlexWidget, IconWidget, ListWidget, TextWidget } from 'react-native-android-widget';

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

interface ScheduleWidgetProps {
  dayName: string,
  lessons?: Lesson[]
}

export function ScheduleWidget({ lessons = [], dayName }: ScheduleWidgetProps) {
  return (
      <ListWidget
        style={{ backgroundColor: '#666', height: 'match_parent', width: 'match_parent' }}
      >
      <TextWidget text={`${dayName}`}
        style={{
          width: 'match_parent',
          textAlign: 'center',
          backgroundColor: '#aaa',
          color: '#666'
        }}/>
        {lessons.map((lesson: Lesson, i: number) => (
          <FlexWidget key={i}
            style={{
              width: 'match_parent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: 8,
              borderWidth: 1,
              borderColor: '#FFF',
              flexGap: 5
            }}>
              <TextWidget text={`${lesson.period}`}/>
              <FlexWidget style={{ borderWidth: 1, height: 'match_parent', borderColor: '#0F0' }}/>
              <TextWidget text={`${lesson.name}`}/>
          </FlexWidget>
        ))}
      </ListWidget>
  );
}

// interface CounterWidgetProps {
//   count: number;
// }

// export function ScheduleWidget({ count = 0 }: CounterWidgetProps) {
//   return (
//     <FlexWidget
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FF0',
//         height: 'match_parent',
//         width: 'match_parent',
//         borderRadius: 32,
//         flex: 1,
//         flexDirection: 'column',
//         flexGap: 5,
//       }}
//     >
//       <FlexWidget
//         style={{
//           height: 'wrap_content',
//           width: 48,
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderWidth: 3,
//           borderColor: '#FF0000'
//         }}
//         clickAction="INCREMENT"
//         clickActionData={{ value: count }}
//       >
//         <TextWidget style={{ fontSize: 48 }} text="+" />
//       </FlexWidget>
//       <FlexWidget style={{ flex: 1, flexDirection: 'row', flexGap: 5 }}>
//         <TextWidget style={{ fontSize: 48, borderWidth: 3, borderColor: '#FF0000' }} text={`${count}`} />
//         <FlexWidget style={{ width: 10, height: 10, backgroundColor: '#0F0' }}></FlexWidget>
//       </FlexWidget>
//       <FlexWidget
//         style={{
//           height: 'wrap_content',
//           width: 48,
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderWidth: 3,
//           borderColor: '#FF0000'
//         }}
//         clickAction="DECREMENT"
//         clickActionData={{ value: count }}
//       >
//         <TextWidget style={{ fontSize: 48 }} text="-" />
//       </FlexWidget>
//     </FlexWidget>
//   );
// }
