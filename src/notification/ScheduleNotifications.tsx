import * as Notifications from 'expo-notifications';
import { Lesson, getIndexWeek } from '../Lesson';

function convertTimeToTrigger(week: number, day: number, time:string, timeBefore = 60){
  const countWeek = 2;
  const now = new Date(Date.now())
  const _hour = +time.split(':')[0];
  const _minutes = +time.split(':')[1];
  const _transfer = (((week * 7 + day) * 24 + _hour) * 60 + _minutes - timeBefore) < (((getIndexWeek() * 7 + now.getDay()) * 24 + now.getHours()) * 60 + now.getMinutes())
  const _week = (_transfer ? countWeek : 0) + week - getIndexWeek();
  const _day = (_week * 7 + day - now.getDay()) * 24 * 60 * 60 * 1000;
  const trigger = new Date(+now + _day);
  trigger.setHours(_hour, _minutes - timeBefore, 0, 0);
  
  return trigger;
}

export async function addSchedulePushNotification(lesson: Lesson) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${lesson.name}`,
      body: `${lesson.auditorium} ${lesson.teacher}`,

      // data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger:  { date: convertTimeToTrigger(lesson.week, lesson.day, lesson.time[0]) },
    
  });
  // console.log('create: ' + identifier);
  return identifier;
}

export async function cancelPushNotification(identifier: string) {
  // console.log('remove: '+ identifier);
  await Notifications.cancelScheduledNotificationAsync(identifier);
}

export async function cancelAllPushNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getAllPushNotification() {
  const identifiers = await Notifications.getAllScheduledNotificationsAsync();
  identifiers.map((x, i) => { console.log('%d - %s', i, JSON.stringify(x, null, 2)) });
}