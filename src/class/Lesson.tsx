import AsyncStorage from "@react-native-async-storage/async-storage";
import { addSchedulePushNotification, cancelPushNotification } from "../notification/ScheduleNotifications";

export const DayOfWeekName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const;
export type DayOfWeekNameType = typeof DayOfWeekName[number];;

export interface LessonsDay {
  name: DayOfWeekNameType;
  hiddenOff: boolean;
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

  hidden: boolean;
  notification: boolean;
  identifiersPushNotification?: string | undefined;
}

export class LessonClass {
  private lessons: Lesson[];
  // console.log("Lesson debag:\n" + JSON.stringify(this.lessons, null, 2));

  async replace(oldLesson: Lesson, newLesson: Lesson) {
    if (newLesson.notification) newLesson.identifiersPushNotification = await addSchedulePushNotification(newLesson);
    await this.load();
    if (oldLesson) {
      const i = this.lessons.findIndex((x: Lesson) => {
        return (x.day == oldLesson.day && x.week == oldLesson.week && x.period == oldLesson.period)
      });

      const _ = this.lessons[i]?.identifiersPushNotification;
      if (_ != undefined) cancelPushNotification(_);
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
    await this.save();
  }

  async remove(oldLesson: Lesson) {
    await this.load();
    const i = this.lessons.findIndex((x: Lesson) => {
      return (x.day == oldLesson.day && x.week == oldLesson.week && x.period == oldLesson.period)
    });
    const _ = this.lessons[i]?.identifiersPushNotification;
    if (_ != undefined) cancelPushNotification(_);
    if (i != -1) this.lessons.splice(i, 1);
    await this.save();
  }

  getDayLessons(day: DayOfWeekNameType, indexWeek: number): Lesson[] {
    return this.lessons
      .filter(x => (DayOfWeekName[x.day] == day && (x.week == indexWeek || x.week == 0)))
      .sort(function (a, b) {
        return (a.period > b.period) ? 1 : -1
      });
  }

  getWeekLessons(indexWeek: number): LessonsDay[] {
    return DayOfWeekName.map(x => ({
      name: x,
      hiddenOff: false,
      lessons: this.getDayLessons(x, indexWeek)
    }) as LessonsDay);
  }


  async load() {
    // console.log('load');
    try {
      let _: string | null;
      this.lessons = (_ = await AsyncStorage.getItem('lessons')) ? JSON.parse(_) : []
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  async loadDefault() {
    await this.load();
    this.lessons = lessonsDefault;
    await this.save();
  }

  async save() {
    // console.log('save');
    try {
      await AsyncStorage.setItem('lessons', JSON.stringify(this.lessons));
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

  async allNotificationOff() {
    await this.load();
    this.lessons.map((x) => { x.notification = false; x.identifiersPushNotification = undefined })
    await this.save();
  }

  constructor() {
    this.lessons = [];
    // this.load();
  }
}

export function getIndexWeek(): number {
  const countWeek = 2;
  const now = new Date();
  let date;
  if (now.getMonth() < 9) date = new Date(`${now.getFullYear() - 1}-09-01T00:00:00.000Z`);
  else date = new Date(`${now.getFullYear()}-09-01T00:00:00.000Z`);

  const weekIndex = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)) % countWeek;

  return +weekIndex + 1;
}

const lessonsDefault = [
  {
    period: 2,
    day: 4,
    week: 1,
    time: ['10:00', '11:20'],
    name: 'ФДТ: Основы имиджовой коммуникации (лек)',
    auditorium: 'К706',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 3,
    day: 4,
    week: 1,
    time: ['11:30', '12:50'],
    name: 'ФДТ: Основы имиджовой коммуникации (лек)',
    auditorium: 'К706',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 2,
    day: 4,
    week: 2,
    time: ['10:00', '11:20'],
    name: 'Производственная практика, научно иследовательская работа (CDIO), (пр)',
    auditorium: 'А320',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 3,
    day: 4,
    week: 2,
    time: ['11:30', '12:50'],
    name: 'Производственная практика, научно иследовательская работа (CDIO), (пр)',
    auditorium: 'А320',
    teacher: ''
  },


  {
    period: 2,
    day: 1,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin',
    hidden: false,
    notification: false
  },
  {
    period: 3,
    day: 1,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin',
    hidden: false,
    notification: false
  },
  {
    period: 1,
    day: 2,
    week: 0,
    time: ['8:30', '9:50'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin',
    hidden: false,
    notification: false
  },
  {
    period: 2,
    day: 2,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin',
    hidden: false,
    notification: false
  },
  {
    period: 4,
    day: 3,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У106',
    teacher: '',
    hidden: false,
    notification: false
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
  // {
  //   period: 2,
  //   day: 4,
  //   week: 0,
  //   time: ['10:00', '11:20'],
  //   name: 'ФДТ: Основы подготовки технической документации (пр)',
  //   auditorium: 'У408',
  //   teacher: ''
  // },
  // {
  //   period: 3,
  //   day: 4,
  //   week: 0,
  //   time: ['11:30', '12:50'],
  //   name: 'Система управления мехатронными комплексами (лаб)',
  //   auditorium: 'У403',
  //   teacher: ''
  // },
  {
    period: 4,
    day: 4,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лаб)',
    auditorium: 'У105',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 2,
    day: 5,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 3,
    day: 5,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: '',
    hidden: false,
    notification: false
  },
  {
    period: 2,
    day: 6,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин',
    hidden: false,
    notification: false
  },
  {
    period: 3,
    day: 6,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин',
    hidden: false,
    notification: false
  },
] as Lesson[]
