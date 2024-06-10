import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Setting {
  indexDay: number;
  indexWeek: number;

}

export class SettingClass {
  private setting: Setting | undefined;
  // console.log("Setting debag:\n" + JSON.stringify(this.setting, null, 2));


  // async load() {
  //   try {
  //     let _: string | null;
  //     this.setting = (_ = await AsyncStorage.getItem('settings')) ? JSON.parse(_) : []
  //   } catch (e) {
  //     console.log('error\n' + e)
  //   }
  // }

  // async save() {
  //   try {
  //     await AsyncStorage.setItem('settings', JSON.stringify(this.setting));
  //   } catch (e) {
  //     console.log('error\n' + e)
  //   }
  // }

  constructor() {
    this.setting;
    // this.load();
  }
}