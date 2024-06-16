import AsyncStorage from "@react-native-async-storage/async-storage";

interface Setting {
  countWeek: number;
  timeBeforeNotification: number;
}

class SettingClass {
  private setting: Setting;
  // console.log("Setting debag:\n" + JSON.stringify(this.setting, null, 2));

  check() { console.log('gg1', this.setting?.timeBeforeNotification) }

  async load() {
    try {
      let _: string | null;
      this.setting = (_ = await AsyncStorage.getItem('settings')) ? JSON.parse(_) : {
        countWeek: 2,
        timeBeforeNotification: 60
      } as Setting
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  async save() {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(this.setting));
    } catch (e) {
      console.log('error\n' + e)
    }
  }

  constructor() {
    this.setting = {
      countWeek: 2,
      timeBeforeNotification: 60
    };
  }
}

export const globalSettingClass = new SettingClass();
globalSettingClass.load();