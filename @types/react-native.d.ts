// types/react-native.d.ts
declare module 'react' {
  export = React;
  export as namespace React;

  namespace React {
    // ... минимальные определения, если нужно, или просто оставь пустым
  }
}

declare module 'react-native' {
  import React = require('react');
  export type ViewStyle = any;
  export type TextStyle = any;
  export type ImageStyle = any;

  // Просто объявляем, что эти модули существуют, без типизации
  export const View: any;
  export const Text: any;
  export const TextInput: any;
  export const TouchableOpacity: any;
  export const FlatList: any;
  export const KeyboardAvoidingView: any;
  export const Platform: any;
  export const Alert: any;
  // Добавь сюда другие компоненты, которые используешь
}