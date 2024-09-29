import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { orange } from '../App';
import { Animated } from 'react-native';

interface SwitchProps {
    text1: string;
    text2: string;
    setexternselected: (selected: string) => void;
}

export const Switch: React.FC<SwitchProps> = ({ text1, text2, setexternselected }) => {
    const [selected, setSelected] = React.useState(text1);
    useEffect(() => {
        setexternselected(selected);
    }, [selected]
    );
    useEffect(() => {
        setexternselected(selected);
    }, []
    );
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {setSelected(text1)}} style = {[selected == text1 ? styles.touchableselected : styles.touchable]}>
                <Text style={[{color : "white", fontWeight : "bold"}, selected != text1 ? styles.textselected : null]}>{text1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelected(text2)}} style = {[selected == text2 ? styles.touchableselected : styles.touchable]}>
                <Text style={[{color : "white", fontWeight : "bold"}, selected != text2 ? styles.textselected : null]}>{text2}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 33,
        paddingLeft: 5,
        gap: 10,
        paddingRight: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    textselected:{
        color : "#DFDFDF"
    },
    touchableselected:{
        backgroundColor : "#FE7A36", 
        width : 90, 
        height : "100%", 
        borderRadius : 33,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        color : "black",
    },
    touchable:{
        backgroundColor : "white", 
        width : 90, 
        height : "100%", 
        borderRadius : 33,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        color : "white",
    }
});

export default Switch;