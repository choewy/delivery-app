import { FC } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TextInputViewProps } from './types';

export const TextInputView: FC<TextInputViewProps> = ({
  labelText,
  ...props
}) => {
  return (
    <View style={styles.view}>
      {labelText && <Text style={styles.text}>{labelText}</Text>}
      <TextInput
        style={styles.textInput}
        {...props}
        placeholderTextColor="#666"
        importantForAutofill="yes"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});
