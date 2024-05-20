import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import type { WidgetConfigurationScreenProps } from 'react-native-android-widget';
import { ScheduleWidget } from './ScheduleWidget';

const CONFIGURABLE_WIDGET_STORAGE_KEY = 'ConfigurableWidget:config';

export function WidgetConfigurationScreen({ widgetInfo, setResult, renderWidget, }: WidgetConfigurationScreenProps) {
  const [value, setValue] = useState(1);
  const [incrementBy, setIncrementBy] = useState(1);

  useEffect(() => {
    async function init() {
      const configStr = await AsyncStorage.getItem( CONFIGURABLE_WIDGET_STORAGE_KEY );

      const config = JSON.parse(configStr ?? '{}');
      setValue((config[widgetInfo.widgetId] ?? { value: 1 }).value);
      setIncrementBy((config[widgetInfo.widgetId] ?? { incrementBy: 1 }).incrementBy);
    }

    init();
  }, [widgetInfo.widgetId]);

  function ok() {
    async function saveAndExit() {
      const configStr = await AsyncStorage.getItem( CONFIGURABLE_WIDGET_STORAGE_KEY );

      const config = JSON.parse(configStr ?? '{}');

      config[widgetInfo.widgetId] = config[widgetInfo.widgetId] ?? { value: 1 };
      config[widgetInfo.widgetId].value = value;
      config[widgetInfo.widgetId].incrementBy = incrementBy;

      // renderWidget(<ScheduleWidget count={value} />);

      await AsyncStorage.setItem( CONFIGURABLE_WIDGET_STORAGE_KEY, JSON.stringify(config) );

      setResult('ok');
    }

    saveAndExit();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Set value</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 32,
          columnGap: 32,
        }}
      >
        <Button title="-" onPress={() => setValue((i) => Math.max(i - 1, 1))} />
        <Text style={{ fontSize: 32 }}>{value}</Text>
        <Button title="+" onPress={() => setValue((i) => i + 1)} />
      </View>

      <Text>Set increment by</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 32,
          columnGap: 32,
        }}
      >
        <Button
          title="-"
          onPress={() => setIncrementBy((i) => Math.max(i - 1, 1))}
        />
        <Text style={{ fontSize: 32 }}>{incrementBy}</Text>
        <Button title="+" onPress={() => setIncrementBy((i) => i + 1)} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 32,
        }}
      >
        <Button title="Cancel" onPress={() => setResult('cancel')} />
        <Button title="OK" onPress={ok} />
      </View>
    </View>
  );
}
