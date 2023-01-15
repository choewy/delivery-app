import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootScreenName } from './enums';

export type RootScreenParamList = Record<RootScreenName, undefined>;
export type RootScreenProps<T extends RootScreenName> = NativeStackScreenProps<
  RootScreenParamList,
  T
>;
