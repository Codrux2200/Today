import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../text/text';
import Credit from '../../assets/credit.svg';
export const CreditPin = () => {

    return(
        <View style = {{height : 28, width : 53, backgroundColor : 'white', borderRadius : 100, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', gap : 5}}>
            <CustomText style = {{fontSize : 12, color : 'black', textAlign : 'center'}}>20</CustomText>
            <Credit></Credit>
        </View>
    );

}


export const CreditPinBlue = () => {

    return(
        <View style = {{height : 28, width : 53, backgroundColor : 'rgb(94,171,248)', borderRadius : 100, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', gap : 5}}>
            <Credit></Credit>
            <CustomText style = {{fontSize : 12, color : 'white', textAlign : 'center', fontWeight : "bold"}}>20</CustomText>
        </View>
    );

}