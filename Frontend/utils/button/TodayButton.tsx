import React from 'react';
import { TouchableOpacity, StyleSheet, ButtonProps, DimensionValue } from 'react-native';
import { CustomText } from '../text/text';
import { CustomButtonProps } from '../../models/CustomButtonprops';


export const CustomButton: React.FC<CustomButtonProps> = ({ title, color, textcolor, border, width, height, borderWidth, OnClick, ...props }) => {

    if (!textcolor){
        textcolor = "black";
    }
    if (!border){
        border = 100;
    }
    
  return (
    <TouchableOpacity
    onPress={OnClick}
      style={[
        styles.button,
        { backgroundColor: color },
        {borderWidth : color == "white" && borderWidth ? 1 : 0},
        { width: width},
        { height: height},
        {borderRadius : border}
      ]}
      {...props}
    >
      <CustomText style={{color : textcolor, fontSize : 14, fontFamily : "FigTree"}} >{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
