import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Switch from '../../libs/Switch';
import { SearchLine } from '../../libs/SearchLine';
import Categories from '../../libs/Categories';

const CalendarPage = () => {
    const [externselected, setexternselected] = useState("");
    return (
        <View style={styles.container}>
             <View style= {{marginTop : 90}}></View>
            <View style = {styles.switchContainer}>
                <Switch text1='Health' text2='Wellness' setexternselected={setexternselected}></Switch>
            </View>
            <View style = {styles.centerelement}>
                <SearchLine></SearchLine></View>
                <Categories></Categories>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6f9",
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    switchContainer: {
        display: 'flex',
        alignItems: "flex-end",
        marginBottom: 30,
        paddingRight: 20,
    },
    centerelement: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

    },
});

export default CalendarPage;
