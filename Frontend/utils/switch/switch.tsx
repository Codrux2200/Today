import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../text/text';
import Loupe from '../../assets/loupe.svg';
import { CreditPin } from '../creditsView/creditpin';
import { StyleSheet } from 'react-native';


export const Switch = ({color = 'white'}) => {
    const [switchState, setSwitchState] = useState(0);
    return(
        <View style={[{borderWidth : 1, borderColor : "rgb(225,225,225)" , alignSelf : "center" ,height : 40, width : 154, flexDirection: 'row' , justifyContent: "space-between", alignItems: 'center', backgroundColor: color, borderRadius: 20, paddingHorizontal : 5}]}>
           <TouchableOpacity style = {[{height : 32, borderRadius : 100, width : 70, alignItems : "center", justifyContent : "center"}, switchState === 0 && {backgroundColor: "rgb(223,223,223)"}]} onPress={() => setSwitchState(0)}><CustomText style = {[switchState === 0 ? {color: "black"} : {color : "rgb(110,110,110)"}]}>Health</CustomText></TouchableOpacity>
           <TouchableOpacity style = {[{height : 32, borderRadius : 100, width : 70, alignItems : "center", justifyContent : "center"}, switchState === 1 && {backgroundColor: "rgb(223,223,223)"}]} onPress={() => setSwitchState(1)}><CustomText style = {[switchState === 1 ? {color: "black"} : {color : "rgb(110,110,110)"}]}>Wellness</CustomText></TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    shadowBox: {
        overflow : "visible",
        borderRadius: 20,
        shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
        shadowOffset: { width: 0, height: 1 }, // Déplacement horizontal et vertical de l'ombre
        shadowOpacity: 0.1, // Transparence de l'ombre (0 à 1)
        shadowRadius: 5, // Rayon de l'ombre (effet de flou)
        elevation: 5, // Ombre pour Android
      },

});