import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import SwipeToStart from '../../libs/SwipetoStart';
import React, { useState } from 'react';
import {StarterButton} from '../../libs/StarterButton'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

export const StarterLogin = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width, height } = Dimensions.get('window');
    const [text, settext] = useState(0);
    const textStrings = [
        "Purchase credits to book group or individual classes.",
        "Attend classes and reward yourself by earning credits.",
        "Improve social by share classes and credits with friends.",
        "Already a coach? Sign up to boost your popularity!",
        "Purchase credits to book group or individual classes.",
        "Attend classes and reward yourself by earning credits.",
        "Improve social by share classes and credits with friends.",
        "Already a coach? Sign up to boost your popularity!"
    ];

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/acceuil_1.png")}
            />
            <View style={{ position: 'absolute', top: "13%", width: "90%", marginLeft: "10%" }}>
                <Text style={{ color: 'white', fontSize: 34, fontWeight: 'bold' }}>{textStrings[0]}</Text>
                <Text style={{ color: 'white', marginRight: 20, paddingTop: 20 }}>today application</Text>
            </View>
                <View style = {{position : 'absolute', bottom : 60, gap : 30}}>
                    <StarterButton action={() => {navigation.navigate("home" as never)}} title="I'm a Consumer" type={0} />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});