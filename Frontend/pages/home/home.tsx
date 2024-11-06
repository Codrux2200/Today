import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Switch from '../../libs/Switch';
import { useState } from 'react';
import SearchLine from '../../libs/SearchLine';
import Card from '../../libs/Card';
import Menu from '../../libs/menu';
import AbsolutMenu from '../../libs/AbsolutMenu';
import { FontAwesome5 } from '@expo/vector-icons';
import Categories from '../../libs/Categories';

export function Home() {
    const [externselected, setexternselected] = useState("");
    return(
        <View style= {styles.container}>
            <View style= {{marginTop : 90}}></View>
            <View style = {styles.switchContainer}>
                <Switch text1='Health' text2='Wellness' setexternselected={setexternselected}></Switch>
            </View>
            <View style = {styles.centerelement}><SearchLine></SearchLine></View>
            <Menu></Menu>
            <Categories></Categories>

        </View>
    );
};

const styles = StyleSheet.create({

    centerelement: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

    },
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    coinView:{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        textAlign : 'center',
        borderRadius : 100,
        width : '35%',
        gap : 5,
        backgroundColor : "white",
        height : 50,
    },
    innerContainer: {
        top: 80,
        marginLeft: 20,
        marginRight: 20,
    },
    switchContainer: {
        display: 'flex',
        alignItems: "flex-end",
        marginBottom: 30,
    },
    cardContainer: {
        flexDirection: 'row',
    },
});