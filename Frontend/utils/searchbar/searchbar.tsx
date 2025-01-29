import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../text/text';
import Loupe from '../../assets/loupe.svg';
import { CreditPin } from '../creditsView/creditpin';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const SearchBar = ({color = 'rgb(247,247,247)'}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity activeOpacity={1} onPress={() => {navigation.navigate("FilterPage" as never)}} style={[{height : 56, width : "90%", flexDirection: 'row', padding : 15 , justifyContent: "space-between", alignItems: 'center', backgroundColor: color, borderRadius: 20}]}>
            <Loupe></Loupe>
            <View>
                <CustomText style = {{fontSize : 16, fontWeight : "bold"}}>What we do ?</CustomText>
                <CustomText style = {{color : 'rgb(110, 110 ,110)', fontSize : 12}}>Any activities · Anytime · Anywhere</CustomText>
            </View>
            <View style={styles.shadowBox}>
                <CreditPin></CreditPin>
            </View>
        </TouchableOpacity>
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