import React from 'react';
import { TouchableOpacity, StyleSheet, ButtonProps, DimensionValue } from 'react-native';
import { CustomText } from '../text/text';

interface CustomButtonProps extends ButtonProps {
  color: string;
  width : DimensionValue;
  height : DimensionValue;
  textcolor?: string;
  border?: number;
  borderWidth?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, color, textcolor, border, width, height, borderWidth, ...props }) => {

    if (!textcolor){
        textcolor = "black";
    }
    if (!border){
        border = 100;
    }
    
  return (
    <TouchableOpacity
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
