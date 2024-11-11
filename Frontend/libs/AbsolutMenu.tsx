import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { useNavigation } from '@react-navigation/native';
const AbsolutMenu: React.FC = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [color, setColor] = useState(0);


    useEffect(() => {

        setColor
    }, [currentIndex]);

    const icons = [
        {
            name : "home"
        },
        {
            name : "search"
        },
        {
            name : "calendar"
        },
        {
            name : "user"
        },
    ];


    return (
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} // Dégradé du transparent au noir avec 20% d'opacité
        style={styles.container}>
            <BlurView style={{
                position: 'absolute', bottom: 50, backgroundColor: "rgba(255, 255, 255, 0.2)", width: '70%', height: 84, borderRadius: 100, overflow: 'hidden',
                display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent:"space-around", padding : 10,
            }}> 
                {icons.map((icon, index) => {

                    return (
                        <TouchableOpacity onPressIn={() => {setCurrentIndex(index); navigation.navigate(icons[index].name as never) }} style = {[{display : "flex", flexDirection : "row", alignItems : "center", height : 84, width : 84, borderRadius : 100, justifyContent : "center"},  currentIndex != index ?  null : {backgroundColor : 'white'} ]}>
                            <FontAwesome5 name={icon.name} size={25} color={currentIndex == index ? "#C9D8E2" : "white"} />
                        </TouchableOpacity>
                    );
                }
            )}
            </BlurView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 700,
        zIndex : 10000,
        left: -20,
        right:-30,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#000',
        fontFamily : 'Poppins-Black'
    },
});

export default AbsolutMenu;