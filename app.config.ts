import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
  widgets: [
    {
      name: 'Schedule',
      minWidth: '120dp',
      minHeight: '120dp',
      targetCellWidth: 3,
      targetCellHeight: 1,

      description: 'Widget',
      previewImage: './assets/widget-preview/ScheduleWidgetPreview.png',

      updatePeriodMillis: 3600000,
      resizeMode: 'horizontal|vertical'
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'App_Schedule',
  slug: 'App_Schedule',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    googleServicesFile: './secret/google-services.json',
    package: "com.user135792468.App_Schedule"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "f3342abe-1c86-44e7-8f26-af5ceff00434"
    }
  },
  owner: "user135792468",
  plugins: [['react-native-android-widget', widgetConfig]],
});

