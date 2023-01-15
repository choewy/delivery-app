import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyScreenParamList } from './types';

export const MyScreenStack = createNativeStackNavigator<MyScreenParamList>();
