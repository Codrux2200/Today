import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { CustomText } from '../text/text';
import Star from "../../assets/star.svg";
import { CreditPin } from '../creditsView/creditpin';
import { useNavigation } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import useApi from '../../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export const MinicourseView : React.FC<{colective : boolean, img : string, title : string, author : string, rating : number, onPress : any}> = ({img, title, author, rating, onPress, colective}) => {
    const { request, data, loading, error } = useApi<author>(API_URL || " ");
    const [realauthor, setrealAuthor] = React.useState({name : "", picture : "", adress : {latitude : 0, longitude : 0}} as author | null);
    useEffect(() => {
        const fetchAuthor = async () => {
            if (author == "to do") return; 
            const rauthor = await request("/profile", "POST", {id : author}, {Authorization : `Bearer ${await AsyncStorage.getItem("token")}`});
            console.log(rauthor);
            setrealAuthor(rauthor);
        } 
        fetchAuthor();
    }
    , []);
    return(
        <TouchableOpacity onPress = {onPress}>
            <View style = {styles.container}>
                <ImageBackground style = {styles.image} source = {{uri : img}}>
                    <View style = {{marginRight : "7%", marginTop : "7%"}}>
                    <CreditPin></CreditPin>
                    </View>
                </ImageBackground>
                <View>
                    <View style = {styles.titlecontainer}>
                        <CustomText style = {styles.title}>{title}</CustomText>
                        <View style = {{flexDirection : "row", alignItems : "center"}}>
                            <Star></Star>
                        <CustomText>{rating}</CustomText>
                        </View>
                    </View>
                </View>
                <View style = {{height : 4}}></View>
                <View style = {{flexDirection : "column", justifyContent : "space-between", gap : "4%"}}>
                        <CustomText style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{realauthor?.name}</CustomText>
                        <CustomText  style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{!colective ? "Collective course" : "Private course"}</CustomText>
                    </View>
            </View>
        </TouchableOpacity>
    );
};

interface author{
    name : string,
    picture: string,
    adress : LatLng;
}
const API_URL = "http://172.20.10.12:3000";
export type RootStackParamList = {
    [x: string]: any;
    YourScreen: { id: number } | undefined;
  };

export const MiniCoursesList : React.FC<{courses : any, label : string, setShow : any}> = ({courses, label, setShow}) => {
    const navigation = useNavigation<RootStackParamList>();

    return(
        <View>
            <View style = {{flexDirection : "row", justifyContent : "space-between", alignItems : "center", marginRight : "5%"}}>
                <CustomText style = {{fontWeight : "bold", fontSize : 22}}>{label}</CustomText>

                <TouchableOpacity onPress={() => {setShow({label : label, list : courses})}} activeOpacity={1} style = {{flexDirection : "row", justifyContent : "space-between", alignItems : "center", gap: 10}}>
                    <CustomText style = {{color : "rgb(65,99,130)"}}>Show All</CustomText>
                    <View style = {{width : 24, height : 24, backgroundColor : "rgb(212, 234,253)", borderRadius : 100, flexDirection : "row", alignItems : "center", justifyContent : "center"}}>
                        <CustomText style = {{fontWeight : "bold", color : "rgb(65,99,130)"}}>{">"}</CustomText></View>
                </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style = {{flexDirection : "row", gap : 10, marginRight : "5%", width :"100%"}}>
            {
                courses.map((course : any, index : number) => (
                    <MinicourseView onPress={() => {navigation.navigate("Profil", {id : course._id})}} colective={course.private} key={index} img={course.img} title={course.title} author={course.by} rating={4.8} />
                ))
            }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        width : 202,
        height : 272,
        flexDirection : "column",
        backgroundColor : "white",
        borderRadius : 20,
        borderWidth : 1,
        margin : 10,
        padding : 7,
        borderColor : "rgb(236,236,236)",
    },
    image : {
        flexDirection : "column",
        alignItems : "flex-end",
        overflow : "hidden",
        width : "100%",
        height : 160,
        borderRadius : 12
    },
    textcontainer : {
        width : "100%",
        height : 120,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    },
    titlecontainer : {
        marginTop : "4%",
        justifyContent : "space-between",
        width : "100%",
        flexDirection : "row",
    },
    title : {
        width : "70%",
        height : 25,
        overflow : "hidden",
        fontSize : 19,
        fontWeight : "bold",
    },
});
