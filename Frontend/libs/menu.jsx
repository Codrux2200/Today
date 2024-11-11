import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Menu = () => {

    const [selectedItem, setSelectedItem] = React.useState("Yoga");
    const items = [
        { name: "Yoga", icon: "praying-hands" },
        { name: "Boxing", icon: "hand-rock" },  
        { name: "Basketball", icon: "basketball-ball" }, 
        { name: "Football", icon: "football-ball" },  
        { name: "Tennis", icon: "table-tennis" },  
        { name: "Golf", icon: "golf-ball" },       
        { name: "Swimming", icon: "swimmer" },      
        { name: "Running", icon: "running" },     
        { name: "Cycling", icon: "biking" },      
        { name: "Gym", icon: "dumbbell" }             
      ];
    

    return (
        <ScrollView style={styles.container} horizontal = {true} showsHorizontalScrollIndicator = {false}>
            {items.map((item, index) => (
                <TouchableOpacity onPress={() => {setSelectedItem(item.name)}} key={index} style={[styles.menuItem, selectedItem == item.name ? styles.selectedItem : null]}>
                    <FontAwesome5 style={[styles.menuText, selectedItem == item.name ? styles.selectedText : null]} name={item.icon} size={24} color="black"  />
                    <Text style={[styles.menuText, selectedItem == item.name ? styles.selectedText : null]}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor : "#DADADA",
        maxHeight: 70,
        borderBottomWidth : 1
    },
    selectedItem:{
        color : "black",
        borderBottomWidth: 1,
    },
    menuItem: {
        padding: 14,
        marginLeft : 10,
        marginRight : 10,
        height: 70,
        color : "#DADADA",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column",
    },

    selectedText:{
        color : "black",
        fontWeight: "bold",
        fontFamily : 'Poppins-Black'
    },
    menuText: {
         color : "#DADADA",
         fontFamily : 'Poppins-Black',
    }
});

export default Menu;