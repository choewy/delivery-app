import { ReactElement } from 'react';
import { TextInputView, TextInputViewProps } from '@/components';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export class SignUpComponent {
  private pressableStyle(canNext: boolean) {
    const normal: ViewStyle = {
      backgroundColor: 'gray',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 10,
    };

    const next = StyleSheet.compose(normal, {
      backgroundColor: 'blue',
    }) as ViewStyle;

    return StyleSheet.create({
      button: canNext ? next : normal,
      text: { color: 'white', fontSize: 16 },
    });
  }

  email(props: Partial<TextInputViewProps>): ReactElement {
    props = {
      labelText: '이메일',
      placeholder: '이메일을 입력하세요.',
      autoComplete: 'off',
      textContentType: 'emailAddress',
      returnKeyType: 'next',
      blurOnSubmit: false,
      ...props,
    };

    return <TextInputView {...props} />;
  }

  name(props: Partial<TextInputViewProps>): ReactElement {
    props = {
      labelText: '이름',
      placeholder: '이름을 입력하세요.',
      autoComplete: 'off',
      textContentType: 'name',
      returnKeyType: 'next',
      blurOnSubmit: false,
      ...props,
    };

    return <TextInputView {...props} />;
  }

  password(props: Partial<TextInputViewProps>): ReactElement {
    props = {
      labelText: '비밀번호',
      placeholder: '비밀번호를 입력하세요.',
      autoComplete: 'off',
      textContentType: 'password',
      returnKeyType: 'send',
      secureTextEntry: true,
      ...props,
    };

    return <TextInputView {...props} />;
  }

  buttons(props: {
    email: string;
    name: string;
    password: string;
    signUpEvent: (event: GestureResponderEvent) => void;
    signInEvent: (event: GestureResponderEvent) => void;
  }): ReactElement {
    const canNext = props.email && props.name && props.password;
    const styles = this.pressableStyle(!!canNext);

    return (
      <View style={{ alignItems: 'center' }}>
        <Pressable
          style={styles.button}
          disabled={!canNext}
          onPress={props.signUpEvent}>
          <Text style={styles.text}>회원가입</Text>
        </Pressable>
        <Pressable onPress={props.signInEvent}>
          <Text>로그인</Text>
        </Pressable>
      </View>
    );
  }
}

export const signUpComponent = new SignUpComponent();
