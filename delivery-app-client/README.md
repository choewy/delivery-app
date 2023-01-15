# React-Native

## Required

- ruby 2.7.5
- Android SDK
- Xcode(Mac)
- watchman(Mac)

## Install

```
$ npx react-native init Delivery --template react-native-template-typescript
$ cd Delivery/ios
$ pod install
```

## Navigation

```
$ npm i @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

- additional(Mac)

```
$ npx pod-install
```

./android/app/src/main/java/Delivery/MainActivity.java

```java
import android.os.Bundle;

@Override
protected void onCreate(Bundle saveInstanceState) {
  super.onCreate(null);
}
```
