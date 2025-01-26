import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CustomText } from "../utils/text/text";
import { CustomButton } from '../utils/button/TodayButton';
import { FloatingTitleTextInputField } from '../utils/floating-input/floatinginput';
import { SimplyLogin, SimplyLogup } from '../utils/button/Simplylogin';
import { useNavigation } from '@react-navigation/native';


export const SignUpPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();
    return(   
        <View style={styles.container}>
            <View style = {{marginTop : 30, marginLeft : 20, width : "100%"}}>
            <CustomText style={{fontWeight : "bold", fontSize : 32}}>Sign up</CustomText>
            <CustomText style={{color : "rgb(110 110 110)", paddingTop : 10, width : "80%"}}>Welcome onboard !</CustomText>
            <View style={{height : 20}}></View>
            <FloatingTitleTextInputField
            attrName = 'Email'
            title = 'Email'
            value = {email}
            updateMasterState = {(attr, value) => {setEmail(value)}}
            />
            <View style={{height : 20}}></View>
            <CustomButton OnClick={() => {navigation.navigate("SignInVerifyCode" as never)}} border={12} textcolor="white" title="Continue with email" color ="#4f9dff" width={"90%"} height={54}></CustomButton>
            <View>
            <View style = {{height : 20, borderBottomWidth : 1, width : "90%", borderColor : "rgb(233,233,233)"}}></View>
            <CustomText style={{ backgroundColor: "white", fontSize : 10, borderWidth: 2, borderColor : "white" , 
                paddingHorizontal : 10 , color : "rgb(233,233,233)", left : "40%", top : "55%" , position : "absolute"}}>OR</CustomText>

            </View>
            <View style={{height : 20}}></View>
            <SimplyLogup title="Google" width={"90%"} height={58} color='white'></SimplyLogup>
            <View style={{height : 10}}></View>
            <SimplyLogup title="Apple" width={"90%"} height={58} color='white'></SimplyLogup>
            <View style={{height : 10}}></View>
            <SimplyLogup title="Microsoft" width={"90%"} height={58} color='white'></SimplyLogup>
            </View>
        </View>
    );

}; 

const styles = StyleSheet.create({
    container:{
        width : "100%",
        flex : 1,
        alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor : "white",
    }
    
});


