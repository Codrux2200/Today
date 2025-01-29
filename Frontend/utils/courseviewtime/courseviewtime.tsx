import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground, useWindowDimensions } from 'react-native';
import { CustomText } from '../text/text';
import Star from "../../assets/star.svg";
import { CreditPin } from '../creditsView/creditpin';


export const CourseViewTime : React.FC<{colective : boolean, img : string, title : string, author : string, rating : number, onPress : any}> = ({img, title, author, rating, onPress, colective}) => {
    return(

            <View style = {styles.container}>
                <ImageBackground style = {styles.image} source = {{uri : img}}>
                    <View style = {{marginRight : "3%", marginTop : "3%"}}>
                    <CreditPin></CreditPin>
                    </View>
                    <View style = {{marginRight : "75%", marginTop : "15%"}}>
                    <View style = {{width : 71, height : 56, backgroundColor : "white",borderRadius : 8}}>
                    <View style = {{height : 28, backgroundColor : "rgb(20,30,40)", borderTopLeftRadius : 8, borderTopRightRadius : 8, alignItems : "center", justifyContent : "center"}}>
                        <CustomText style = {{color : "white", fontWeight : "bold"}}>9:00 pm</CustomText>
                    </View>
                    <View style = {{height : 28, backgroundColor : "white", borderBottomLeftRadius : 8, borderBottomRightRadius : 8, alignItems : "center", justifyContent : "center"}}>
                        <CustomText style = {{color : "black"}}>40 min</CustomText>
                    </View>
                    </View>
                    </View>
                </ImageBackground>
                <View>
                    <View style = {styles.titlecontainer}>
                        <CustomText style = {styles.title}>{title}</CustomText>
                        <View style = {{flexDirection : "row", alignItems : "center", gap : 4}}>
                            <Star></Star>
                        <CustomText>{rating}</CustomText>
                        </View>
                    </View>
                </View>
                <View style = {{height : 4}}></View>
                <View style = {{flexDirection : "column", justifyContent : "space-between", gap : "4%"}}>
                        <CustomText style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{author} · Rabat, Morroco</CustomText>
                        <CustomText  style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{!colective ? "Collective course" : "Private course"} · 12/20</CustomText>
                    </View>
            </View>
    );
};


export const CourseView : React.FC<{colective : boolean, img : string, title : string, author : string, rating : number, onPress : any}> = ({img, title, author, rating, onPress, colective}) => {
    return(

            <View style = {styles.container}>
                <ImageBackground style = {styles.image} source = {{uri : img}}>
                    <View style = {{marginRight : "3%", marginTop : "3%"}}>
                    <CreditPin></CreditPin>
                    </View>
                    <View style = {{marginRight : "75%", marginTop : "15%"}}>
                    </View>
                </ImageBackground>
                <View>
                    <View style = {styles.titlecontainer}>
                        <CustomText style = {styles.title}>{title}</CustomText>
                        <View style = {{flexDirection : "row", alignItems : "center", gap : 4}}>
                            <Star></Star>
                        <CustomText>{rating}</CustomText>
                        </View>
                    </View>
                </View>
                <View style = {{height : 4}}></View>
                <View style = {{flexDirection : "column", justifyContent : "space-between", gap : "4%"}}>
                        <CustomText style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{author} · Rabat, Morroco</CustomText>
                        <CustomText  style = {{ fontSize : 16, color : "rgb(110,110,110)"}}>{!colective ? "Collective course" : "Private course"}</CustomText>
                    </View>
            </View>
    );
};


export const CoursesList : React.FC<{courses : any, label : string, setShow : any}> = ({courses, label, setShow}) => {

    return(
        <ScrollView showsHorizontalScrollIndicator= {true} style = {{}}>
            {
                courses.map((course : any, index : number) => (
                    <CourseView colective={course.private} key={index} img={course.img} title={course.Title} author={course.by} rating={4.8} onPress={course.onPress} />
                ))
            }
        </ScrollView>
    );
};

export const CoursesListTime : React.FC<{courses : any, label : string, setShow : any}> = ({courses, label, setShow}) => {

    return(
        <ScrollView showsHorizontalScrollIndicator= {true} style = {{}}>
            {
                courses.map((course : any, index : number) => (
                    <CourseViewTime colective={course.private} key={index} img={course.img} title={course.Title} author={course.by} rating={4.8} onPress={course.onPress} />
                ))
            }
            <View style = {{height : 600}}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container : {
        width : 'auto',
        height : 290,
        flexDirection : "column",
        backgroundColor : "white",
        borderRadius : 20,
        margin : 10,
        padding : 7,
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
