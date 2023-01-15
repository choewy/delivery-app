import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedScreenName } from './enums';

export type SignedScreenParamList = Record<SignedScreenName, undefined>;
export type SignedScreenProps<T extends SignedScreenName> =
  NativeStackScreenProps<SignedScreenParamList, T>;
