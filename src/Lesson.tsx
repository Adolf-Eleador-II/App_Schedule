import AsyncStorage from "@react-native-async-storage/async-storage";

const DayOfWeekName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
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

export class LessonList {
  private lessons: Lesson[];

  // printJSON() {
  //   console.log("Lesson debag:\n" + JSON.stringify(this.lessons, null, 2));
  // }

  async replace(oldLesson: Lesson, newLesson: Lesson) {
    await this.load();
    if (oldLesson) {

      console.log('find:\n%d - %d - %d - %s\n%d - %d - %d - %s\nin', oldLesson.day, oldLesson.week, oldLesson.period, oldLesson.name, newLesson.day, newLesson.week, newLesson.period, newLesson.name);
      this.lessons.map((x) => { console.log('%d - %d - %d - %s', x.day, x.week, x.period, x.name) })


      const i = this.lessons.findIndex((x: Lesson) => {
        return ((x.day == oldLesson.day && x.week == oldLesson.week && x.period == oldLesson.period) || (x.day == newLesson.day && x.week == newLesson.week && x.period == newLesson.period))
      });

      console.log('\nday: %d = %d\nweek: %d = %d\nperiod: %d = %d\n',
        this.lessons[i].day, newLesson.day,
        this.lessons[i].week, newLesson.week,
        this.lessons[i].period, newLesson.period);
      this.lessons[i] = newLesson;
    }
    else {
      this.lessons.push(newLesson);
    }
    await this.save();
  }

  getDayLessons(day: DayOfWeekNameType): Lesson[] {
    return this.lessons.filter(x => DayOfWeekName[x.day] === day).sort(function (a, b) {
      return (
        a.period > b.period
      ) ? 1 : -1
    });
  }

  getWeekLessons(): LessonsDay[] {
    return DayOfWeekName.map(x => ({
      name: x,
      lessons: this.getDayLessons(x)
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
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  async deleteAll() {
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

const lessonsDefault = [
  {
    period: 2,
    day: 0,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 3,
    day: 0,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Системы управления базами данных (лаб)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 1,
    day: 1,
    week: 0,
    time: ['8:30', '9:50'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 2,
    day: 1,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Системы управления базами данных (лек)',
    auditorium: 'ЭОиДОТ',
    teacher: 'Dmitrii Kuzin'
  },
  {
    period: 4,
    day: 2,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У106',
    teacher: ''
  },
  {
    period: 5,
    day: 2,
    week: 0,
    time: ['14:50', '16:10'],
    name: 'Технологии мультимедиа (лек)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    period: 2,
    day: 3,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'ФДТ: Основы подготовки технической документации (пр)',
    auditorium: 'У408',
    teacher: ''
  },
  {
    period: 3,
    day: 3,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Система управления мехатронными комплексами (лаб)',
    auditorium: 'У403',
    teacher: ''
  },
  {
    period: 4,
    day: 3,
    week: 0,
    time: ['13:20', '14:40'],
    name: 'Технологии мультимедиа (лаб)',
    auditorium: 'У105',
    teacher: ''
  },
  {
    period: 2,
    day: 4,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    period: 3,
    day: 4,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лек)',
    auditorium: 'У903',
    teacher: ''
  },
  {
    period: 2,
    day: 5,
    week: 0,
    time: ['10:00', '11:20'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
  {
    period: 3,
    day: 5,
    week: 0,
    time: ['11:30', '12:50'],
    name: 'Математические методы искусственного интелекта (лаб)',
    auditorium: 'У903',
    teacher: 'Брыкин'
  },
] as Lesson[]
