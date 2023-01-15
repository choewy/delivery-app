import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreenParamList } from './types';

export const RootScreenStack =
  createNativeStackNavigator<RootScreenParamList>();
