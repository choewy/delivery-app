import { Platform } from 'react-native';
import {
  ANDROID_API_URL,
  ANDROID_WS_URL,
  IOS_API_URL,
  IOS_WS_URL,
} from 'react-native-dotenv';

export class ConfigService {
  public API_URL: string;
  public WS_URL: string;

  constructor() {
    let API_URL: string | undefined;
    let WS_URL: string | undefined;

    switch (Platform.OS) {
      case 'android':
        API_URL = ANDROID_API_URL;
        WS_URL = ANDROID_WS_URL;
        break;

      case 'ios':
        API_URL = IOS_API_URL;
        WS_URL = IOS_WS_URL;
        break;
    }

    this.API_URL = API_URL || '';
    this.WS_URL = WS_URL || '';
  }
}

export const configService = new ConfigService();
