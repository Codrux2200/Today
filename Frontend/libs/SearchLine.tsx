import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export const SearchLine: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        // You can add your search logic here
    };

    return (
        <View style={styles.container}>
            <View style = {{width : "60%", display : "flex", flexDirection : 'row', alignItems :"center"}}>
                <FontAwesome5 name="search" size={20} color="black" solid />
                <TextInput
                    style={styles.input}
                    placeholder="I am looking for ..."
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <View style = {styles.coinView}>
                <FontAwesome5Icon name="coins" size={20} color="black" solid />
                <Text>20</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft : 10,
        paddingRight : 10,
        backgroundColor: '#fff',
        borderRadius: 33,
        display : 'flex',
        flexDirection : 'row',
        height : 70,
        alignItems : 'center',
    },
    input: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '70%',
    },
    coinView:{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'column',
        textAlign : 'center',
        borderLeftWidth : 2,
        borderLeftColor : 'rgba(0,0,0,0.1)',
        width : '30%',
        gap : 10,
        height : "100%",
    }
});

export default SearchLine;