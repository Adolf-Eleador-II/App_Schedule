import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ScheduleWidget } from './ScheduleWidget';

const nameToWidget = {
  // Schedule will be the **name** with which we will reference our widget.
  Schedule: ScheduleWidget,
};

export async function WidgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget {...widgetInfo} />);
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