import React from 'react';
import { TouchableOpacity, StyleSheet, ButtonProps, DimensionValue, View } from 'react-native';
import { CustomText } from '../text/text';
import LogoGoogle from "../../assets/google.svg";
import LogoMicrosoft from "../../assets/Companies Logos.svg";
import LogoApple from "../../assets/apple-black.svg";
import { CustomButtonProps } from '../../models/CustomButtonprops';

export const SimplyLogin: React.FC<CustomButtonProps> = ({ title, color, textcolor, border, width, height, borderWidth, OnClick, ...props }) => {

return(
    <TouchableOpacity onPress={OnClick} style={{borderRadius : 12 ,flexDirection : "row", width : width, height : height, justifyContent : "center", alignItems : "center", borderWidth : 1, borderColor : "rgb(228,228,228)" }}>

        {title == "Google" ? <LogoGoogle style = {{marginRight : "3%"}}></LogoGoogle> : title == "Microsoft" ? <LogoMicrosoft style = {{marginRight : "3%"}}></LogoMicrosoft> : <LogoApple style = {{marginRight : "3%"}}></LogoApple>}
        <CustomText>Log in with {title}</CustomText>
    </TouchableOpacity>

);
};


export const SimplyLogup: React.FC<CustomButtonProps> = ({ title, color, textcolor, border, width, height, borderWidth, OnClick, ...props }) => {

    return(
        <TouchableOpacity onPress={OnClick} style={{borderRadius : 12 ,flexDirection : "row", width : width, height : height, justifyContent : "center", alignItems : "center", borderWidth : 1, borderColor : "rgb(228,228,228)" }}>
    
            {title == "Google" ? <LogoGoogle style = {{marginRight : "3%"}}></LogoGoogle> : title == "Microsoft" ? <LogoMicrosoft style = {{marginRight : "3%"}}></LogoMicrosoft> : <LogoApple style = {{marginRight : "3%"}}></LogoApple>}
            <CustomText>Continue with {title}</CustomText>
        </TouchableOpacity>
    
    );
    };