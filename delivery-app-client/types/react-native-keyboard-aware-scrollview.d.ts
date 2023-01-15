declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';
  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
  const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent;
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
  export { KeyboardAwareScrollView };
}
