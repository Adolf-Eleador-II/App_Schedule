import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ScheduleWidget } from './ScheduleWidget';
import { ConfigurableWidget } from './ConfigurableWidget';

const nameToWidget = {
  Schedule: ScheduleWidget,
  Configurable: ConfigurableWidget,
};

const COUNTER_STORAGE_KEY = 'CounterWidget:count';
const CONFIGURABLE_WIDGET_STORAGE_KEY = 'ConfigurableWidget:config';

// async function writeAndGetEvents( widgetId: number, action: string ): Promise<string[]> {
//   const data = await AsyncStorage.getItem(DEBUG_EVENTS_STORAGE_KEY);
//   const items = JSON.parse(data ?? '[]');
//   items.push(`Widget #${widgetId} ${action} - ${new Date().toLocaleString()}`);
//   AsyncStorage.setItem(DEBUG_EVENTS_STORAGE_KEY, JSON.stringify(items));
//   return items;
// }

export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[ widgetInfo.widgetName as keyof typeof nameToWidget ] as any;

  if (widgetInfo.widgetName === 'Configurable') {
    const configStr = await AsyncStorage.getItem( CONFIGURABLE_WIDGET_STORAGE_KEY );
    const config = JSON.parse(configStr ?? '{}');
    const widgetConfig = config[widgetInfo.widgetId] ?? { value: 1, increment: 1, };

    switch (props.widgetAction) {
      case 'WIDGET_RESIZED':
      case 'WIDGET_ADDED':
      case 'WIDGET_UPDATE':
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value}/>);
        break;

      case 'WIDGET_DELETED':
        delete config[widgetInfo.widgetId];
        AsyncStorage.setItem(
          CONFIGURABLE_WIDGET_STORAGE_KEY,
          JSON.stringify(config)
        );
        break;

      case 'WIDGET_CLICK':
        widgetConfig.value = widgetConfig.value + widgetConfig.incrementBy * (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value}/>);
        config[widgetInfo.widgetId] = widgetConfig;
        AsyncStorage.setItem( CONFIGURABLE_WIDGET_STORAGE_KEY, JSON.stringify(config) );
        break;
    }
    return;
  }

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      //Counter
      if (widgetInfo.widgetName === 'Schedule') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<ScheduleWidget count={count}/>);
      } else {
        props.renderWidget(<Widget {...widgetInfo}/>);
      }
      break;

    case 'WIDGET_ADDED':
      //Counter
      if (widgetInfo.widgetName === 'Schedule') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<ScheduleWidget count={count}/>);
      } else {
        props.renderWidget(<Widget {...widgetInfo}/>);
      }
      break;

    case 'WIDGET_UPDATE':
      //Counter
      if (widgetInfo.widgetName === 'Schedule') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<ScheduleWidget count={count}/>);
      } else {
        props.renderWidget(<Widget {...widgetInfo}/>);
      }
      break;

    case 'WIDGET_DELETED':
      // Do nothing
      break;

    case 'WIDGET_CLICK':
      //Counter
      if (widgetInfo.widgetName === 'Schedule') {
        const count =
          (props.clickActionData?.value as number) +
          (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<ScheduleWidget count={count}/>);

        AsyncStorage.setItem(COUNTER_STORAGE_KEY, `${count}`);
      }

      //List
      // if (widgetInfo.widgetName === 'Schedule' && props.clickAction === 'ARCHIVE') {
      //   props.renderWidget(
      //     <Widget archivedIndex={props.clickActionData?.listItemId}/>
      //   );
      // }
      break;

    default:
      break;
  }

}


















/*
export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget {...widgetInfo}/>);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget {...widgetInfo}/>);
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}
*/
