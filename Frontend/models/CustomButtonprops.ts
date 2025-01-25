import React from 'react';
import { TouchableOpacity, StyleSheet, ButtonProps, DimensionValue } from 'react-native';


export interface CustomButtonProps extends ButtonProps {
  color: string;
  width : DimensionValue;
  height : DimensionValue;
  textcolor?: string;
  border?: number;
  borderWidth?: boolean;
  OnClick?: any;
}