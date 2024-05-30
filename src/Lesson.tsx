import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestWidgetUpdate } from "react-native-android-widget";
import { ScheduleWidget } from "./widget/ScheduleWidget";

export const DayOfWeekName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const;
export type DayOfWeekNameType = typeof DayOfWeekName[number];;

export interface LessonsDay {
  name: DayOfWeekNameType;
  lessons: Lesson[];
}

export interface Lesson {
  period: number;
  day: number;
  week: number;
  time: [string, string];
  name: string;
  auditorium: string;
  teacher: string;
}

export function getIndexWeek(): number {
  const countWeek = 2;
  const now = new Date();
  let date;
  if (now.getMonth() < 9) date = new Date(`${now.getFullYear() - 1}-09-01T00:00:00.000Z`);
  else date = new Date(`${now.getFullYear()}-09-01T00:00:00.000Z`);

  const weekIndex = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)) % countWeek;

  return +weekIndex;
}

export class LessonList {
  private lessons: Lesson[];
  // console.log("Lesson debag:\n" + JSON.stringify(this.lessons, null, 2));

  async replace(oldLesson: Lesson, newLesson: Lesson) {
    await this.load();
    if (oldLesson) {
      const i = this.lessons.findIndex((x: Lesson) => {
        return (x.day == oldLesson.day && x.week == oldLesson.week && x.period == oldLesson.period)
      });
      if (i != -1) this.lessons.splice(i, 1);

      const j = this.lessons.findIndex((x: Lesson) => {
        return (x.day == newLesson.day && x.week == newLesson.week && x.period == newLesson.period)
      });
      if (j != -1) this.lessons[j] = newLesson;
      else this.lessons.push(newLesson);
    }
    else {
      this.lessons.push(newLesson);
    }
    this.save();
  }

  async remove(oldLesson: Lesson) {
    await this.load();
    const i = this.lessons.findIndex((x: Lesson) => {
      return (x.day == oldLesson.day && x.week == oldLesson.week && x.period == oldLesson.period)
    });
    if (i != -1) this.lessons.splice(i, 1);
    this.save();
  }

  getDayLessons(day: DayOfWeekNameType, indexWeek: number): Lesson[] {
    return this.lessons
      .filter(x => (DayOfWeekName[x.day] == day && x.week == indexWeek))
      .sort(function (a, b) {
        return (a.period > b.period) ? 1 : -1
      });
  }

  getWeekLessons(indexWeek: number): LessonsDay[] {
    return DayOfWeekName.map(x => ({
      name: x,
      lessons: this.getDayLessons(x, indexWeek)
    }));
  }


  async load() {
    try {
      let _: string | null;
      this.lessons = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : []
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  loadDefault() {
    this.lessons = lessonsDefault;
  }

  async save() {
    try {
      await AsyncStorage.setItem('lessons', JSON.stringify(this.lessons));
      widgetUpdate();
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  async removeAll() {
    try {
      await AsyncStorage.removeItem('lessons');
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  constructor() {
    this.lessons = [];
    // this.load();
  }
}

async function widgetUpdate() {
  const today = new Date().getDay();

  const localLessonClass = new LessonList();
  await localLessonClass.load();
  const dayLessons = localLessonClass.getDayLessons(DayOfWeekName[today], getIndexWeek());
  requestWidgetUpdate({
    widgetName: 'Schedule',
    renderWidget: () => <ScheduleWidget lessons={dayLessons} dayName={DayOfWeekName[today]} />,
    widgetNotFound: () => { }
  })
}

const lessonsDefault = [
  {
    period: 2,
    day: 1,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 3,
    day: 1,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 1,
    day: 2,
    week: 0,
    time: ['8:30', '9:50'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 2,
    day: 2,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 4,
    day: 3,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У106',
    teacher: ''
  },
  {
    period: 5,
    day: 3,
    week: 0,
    time: ['14:50', '16:10'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    period: 2,
    day: 4,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'ФДТ: Основы подготовки технической документации (пр)',
    auditorium: 'У408',
    teacher: ''
  },
  {
    period: 3,
    day: 4,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Система управления мехатронными комплексами (лаб)',
    auditorium: 'У403',
    teacher: ''
  },
  {
    period: 4,
    day: 4,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лаб)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    period: 2,
    day: 5,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    period: 3,
    day: 5,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    period: 2,
    day: 6,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
  {
    period: 3,
    day: 6,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
] as Lesson[]
