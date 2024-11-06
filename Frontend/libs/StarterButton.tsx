import React, {useEffect, useRef} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Image,
  TouchableOpacity
} from 'react-native';
import { Dimensions } from 'react-native';
import { orange } from '../App';


interface StarterButtonProps {
  title: string;
  type: number;
  action : () => void;
}

export const StarterButton: React.FC<StarterButtonProps> = ({title, type, action}) => {

    const params = [{
            backgroundColor : "#C9D8E2",
            color : "white",        
    },
    {
            backgroundColor : "white",
            color : "#C9D8E2",
    }];

    return(
        <TouchableOpacity onPress={action} style = {{backgroundColor : params[type].backgroundColor, width : Dimensions.get("window").width - 30, height : 89, borderRadius : 18, display : 'flex', alignItems : "center", justifyContent : "center", }}>
            <Text style = {{color : params[type].color,  fontSize: 25, fontWeight: 'bold'}}>{title}</Text>
        </TouchableOpacity>
    );

};