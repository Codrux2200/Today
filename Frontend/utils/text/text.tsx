import React from 'react';
import { Text as RNText, TextInput as RNTextInput, TextProps, TextInputProps } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText style={[{ fontFamily: 'FigTree' }, style]} {...props} />;
};

const CustomTextInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  return <RNTextInput style={[{ fontFamily: 'FigTree' }, style]} {...props} />;
};

export { CustomText, CustomTextInput };
