import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { CustomText } from '../utils/text/text';
import { Home } from './home';
import Svg, { Path } from 'react-native-svg';
import { MapSearch } from './MapSearch';
import MapSvg from "../assets/map.svg";
import { ListSearch } from './ListSearch';
import FilterSvg from "../assets/filter.svg";
import ListSvg from "../assets/list.svg";

export const FilterSearch = () => {
    const [showMap, setShowmap] = useState(false);
    return(
        <View style = {{flex : 1}}>
            {
                showMap ?
                    <MapSearch></MapSearch>
                    : 
                    <ListSearch/>
            }
        <View style = {{position : "absolute", top  : useWindowDimensions().height - 170, flexDirection : "row", alignItems : "center", justifyContent : "space-around", width : "100%"}}>
            <View style = {{width : "10%"}}></View>
            <TouchableOpacity onPress={() => {setShowmap(() => !showMap)}} style = {[{height : 54, width: 152, backgroundColor : "black", borderRadius : 30, 
                alignItems : "center", justifyContent : "center", flexDirection : "row", gap : 10, alignSelf : "center"}, styles.shadowBox]}>
                  {
                        !showMap?
                        <MapSvg></MapSvg>:
                        <ListSvg></ListSvg>

                    }
                <CustomText style = {{color : "white", fontWeight : "bold"}}>{!showMap ? "Show Map" : "Show list"}</CustomText>
                </TouchableOpacity>
            <TouchableOpacity style = {[{height : 54, width: 54, backgroundColor : "white", borderRadius : 100, 
                alignItems : "center", justifyContent : "center", flexDirection : "row", gap : 10}, styles.roundedshadowBox]}>
                <FilterSvg></FilterSvg>
                </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowBox: {
        borderRadius: 30,
        shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
        shadowOffset: { width: 0, height: 2 }, // Déplacement horizontal et vertical de l'ombre
        shadowOpacity: 0.7, // Transparence de l'ombre (0 à 1)
        shadowRadius: 2, // Rayon de l'ombre (effet de flou)
        elevation: 10, // Ombre pour Android
      },

      roundedshadowBox: {
        borderRadius: 100,
        shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
        shadowOffset: { width: 0, height: 2 }, // Déplacement horizontal et vertical de l'ombre
        shadowOpacity: 0.7, // Transparence de l'ombre (0 à 1)
        shadowRadius: 2, // Rayon de l'ombre (effet de flou)
        elevation: 10, // Ombre pour Android
      },

});