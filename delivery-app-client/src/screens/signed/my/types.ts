import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyScreenName } from './enums';

export type MyScreenParamList = Record<MyScreenName, undefined>;
export type MyScreenProps<T extends MyScreenName> = NativeStackScreenProps<
  MyScreenParamList,
  T
>;
