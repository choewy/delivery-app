import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignedScreenParamList } from './types';

export const SignedScreenStack =
  createBottomTabNavigator<SignedScreenParamList>();
