import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../text/text';
import Loupe from '../../assets/loupe.svg';
import { CreditPin } from '../creditsView/creditpin';
export const SearchBar = () => {

    return(
        <View style={[{height : 56, width : "90%", flexDirection: 'row', padding : 10 , justifyContent: "space-between", alignItems: 'center', backgroundColor: 'rgb(247,247,247)', borderRadius: 20}]}>
            <Loupe></Loupe>
            <View>
                <CustomText style = {{fontSize : 16, fontWeight : "bold"}}>What we do ?</CustomText>
                <CustomText style = {{color : 'rgb(110, 110 ,110)', fontSize : 12}}>Any activities · Anytime · Anywhere</CustomText>
            </View>
            <View>
                <CreditPin></CreditPin>
            </View>
        </View>
    )

}