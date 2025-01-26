import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CustomText } from "../utils/text/text";
import { CustomButton } from '../utils/button/TodayButton';
import { FloatingTitleTextInputField } from '../utils/floating-input/floatinginput';
import { SimplyLogin } from '../utils/button/Simplylogin';
import { useNavigation } from '@react-navigation/native';


export const SignInPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();

    return(   
        <View style={styles.container}>
            <View style = {{marginTop : 30, marginLeft : 20, width : "100%"}}>
            <CustomText style={{fontWeight : "bold", fontSize : 32}}>Welcome back!</CustomText>
            <CustomText style={{color : "rgb(110 110 110)", paddingTop : 10, width : "80%"}}>We are excited to see you again.</CustomText>
            <View style={{height : 20}}></View>
            <FloatingTitleTextInputField
            attrName = 'Email'
            title = 'Email'
            value = {email}
            updateMasterState = {(attr, value) => {setEmail(value)}}
            />
            <View style={{height : 10}}></View>
            <FloatingTitleTextInputField
            isPassword = {true}
            attrName = 'Password'
            title = 'Password'
            value = {password}
            updateMasterState = {(attr, value) => {setPassword(value)}}
            />
            <TouchableOpacity>
            <CustomText style = {{marginTop: 4, textDecorationLine : "underline"}}>Forgot password ?</CustomText>
            </TouchableOpacity>
            <View style={{height : 20}}></View>
            <CustomButton  OnClick={() => {navigation.navigate("LogHome" as never)}} border={12} textcolor="white" title="Log in with email" color ="#4f9dff" width={"90%"} height={54}></CustomButton>
            <View>
            <View style = {{height : 20, borderBottomWidth : 1, width : "90%", borderColor : "rgb(233,233,233)"}}></View>
            <CustomText style={{ backgroundColor: "white", fontSize : 10, borderWidth: 2, borderColor : "white" , 
                paddingHorizontal : 10 , color : "rgb(233,233,233)", left : "40%", top : "55%" , position : "absolute"}}>OR</CustomText>

            </View>
            <View style={{height : 20}}></View>
            <SimplyLogin title="Google" width={"90%"} height={58} color='white'></SimplyLogin>
            <View style={{height : 10}}></View>
            <SimplyLogin title="Apple" width={"90%"} height={58} color='white'></SimplyLogin>
            <View style={{height : 10}}></View>
            <SimplyLogin title="Microsoft" width={"90%"} height={58} color='white'></SimplyLogin>
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


