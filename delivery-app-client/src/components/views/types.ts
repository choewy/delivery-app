import { MutableRefObject, PropsWithChildren } from 'react';
import { TextInput, TextInputProps, ViewProps } from 'react-native';

export type DismissKeyboardViewProps = PropsWithChildren & ViewProps;
export type TextInputViewProps = TextInputProps & {
  labelText?: string;
  ref?: MutableRefObject<TextInput | null>;
};
