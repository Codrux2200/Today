import React from 'react';
import { Text as RNText, TextInput as RNTextInput, TextProps, TextInputProps } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText style={[{ fontFamily: 'FigTree' }, style]} {...props} />;
};




const CustomTextInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  return(
    <View>


    </View>
  );
}

export { CustomText, CustomTextInput };
