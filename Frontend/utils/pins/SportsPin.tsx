import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../text/text';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
export const SportsPin : React.FC<{ label: string; img : string }> = ({label, img}) => {
    return(
        <View style = {{width : 121, height : 104}}>
            <Image style = {{width : "100%", height : 72, borderRadius : 12}} source = {{uri : img}}></Image>
            <View style = {{width : 5}}></View>
            <CustomText style = {{fontWeight : "bold"}}>{label}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowBox: {
        overflow : "visible",
        borderRadius: 20,
        shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
        shadowOffset: { width: 0, height: 2 }, // Déplacement horizontal et vertical de l'ombre
        shadowOpacity: 0.3, // Transparence de l'ombre (0 à 1)
        shadowRadius: 2, // Rayon de l'ombre (effet de flou)
        elevation: 5, // Ombre pour Android
      },

});