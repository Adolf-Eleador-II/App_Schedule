import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
  widgets: [
    {
      name: 'Schedule', // This name will be the **name** with which we will reference our widget.
      // label: 'My Hello Widget', // Label shown in the widget picker
      minWidth: '320dp',
      minHeight: '120dp',
      // This means the widget's default size is 5x2 cells, as specified by the targetCellWidth and targetCellHeight attributes.
      // Or 320×120dp, as specified by minWidth and minHeight for devices running Android 11 or lower.
      // If defined, targetCellWidth,targetCellHeight attributes are used instead of minWidth or minHeight.
      targetCellWidth: 1,
      targetCellHeight: 2,
      description: 'This is widget', // Description shown in the widget picker
      previewImage: './assets/widget-preview/hello.png', // Path to widget preview image

      // How often, in milliseconds, that this AppWidget wants to be updated.
      // The task handler will be called with widgetAction = 'UPDATE_WIDGET'.
      // Default is 0 (no automatic updates)
      // Minimum is 1800000 (30 minutes == 30 * 60 * 1000).
      updatePeriodMillis: 1000,
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
  userInterfaceStyle: 'light',
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
