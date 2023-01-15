import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export class SettingComponent {
  private pressableStyle() {
    const normal: ViewStyle = {
      backgroundColor: 'gray',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 10,
    };

    const active = StyleSheet.compose(normal, {
      backgroundColor: 'blue',
    }) as ViewStyle;

    return StyleSheet.create({
      view: {
        alignItems: 'center',
        paddingTop: 20,
      },
      button: active,
      text: { color: 'white', fontSize: 16 },
    });
  }

  logoutButton(props: {
    signOutEvent: (event: GestureResponderEvent) => void;
  }) {
    const styles = this.pressableStyle();

    return (
      <View style={styles.view}>
        <Pressable style={styles.button} onPress={props.signOutEvent}>
          <Text style={styles.text}>로그아웃</Text>
        </Pressable>
      </View>
    );
  }
}

export const settingComponent = new SettingComponent();
