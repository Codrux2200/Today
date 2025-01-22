import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { CustomButton } from '../utils/button/TodayButton';
import { CustomText } from '../utils/text/text';
import MosaicImages from '../utils/mosaic/mosaic';
import { LinearGradient } from 'expo-linear-gradient';
export const HelloPage = () => {



    return(
        <LinearGradient colors={["#F7F7F7", "#FFFFFF"]}
          start={{x : 0, y : 0}}
          end={{x : Dimensions.get("window").height, y : Dimensions.get("window").width - 50 }}
        style={styles.container}>
         <MosaicImages></MosaicImages>
         <View style = {styles.container}>
            <LinearGradient  colors={["#FFFFFF", "rgba(255,255,255,0)"]} style = {{marginTop : 0, width : "100%", height : 300, display : "flex", flexDirection: 'row', alignItems : "flex-start", justifyContent : "flex-end"}}>
            <View style = {{marginTop : "20%", marginRight : "5%"}}>
            <CustomButton title='I am a gym or a coach' color='white' width={207} height={54}></CustomButton>
            </View>
            </LinearGradient>
            <View style = {{display : 'flex', flexDirection : "column", width : "100%", marginLeft : "10%"}}>
                <Image
                    source={require("../assets/icon.png")}
                    style = {{width : 70, height : 70, marginTop : "39%"}}
                ></Image>
                <CustomText style = {{fontWeight : "bold", fontSize : 32, width : "70%"}}>Do the sport and wellness you want</CustomText>
                <CustomText style = {{ color: "rgb(110 110 110)", paddingTop : 30,  width : "80%"}}>Access multitude of activities, discover new one and vary the pleasures.</CustomText>
            </View>
            <View style = {{marginBottom : "10%", display : "flex", flexDirection : "row", gap: 20}}>
                <CustomButton title='Log In' color='#f0f0f0' width={"40%"} height={54} ></CustomButton>
                <CustomButton title='Join Us' color='#4f9dff' textcolor='white' width={"40%"} height={54} ></CustomButton>

            </View>
         </View>

        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        width : "100%",
        flex : 1,
        alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
  