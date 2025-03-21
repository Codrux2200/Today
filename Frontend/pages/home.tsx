import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CustomText } from '../utils/text/text';
import { SearchBar } from '../utils/searchbar/searchbar';
import { SportsPin } from '../utils/pins/SportsPin';
import Back from "../assets/back.svg"
import { MiniCoursesList } from '../utils/minicourseview/minicourseview';
import { CoursesList } from '../utils/courseviewtime/courseviewtime';
import useApi from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface courses{
    courses : [] | null;
    message : string | null;
} 

export const Home = () => {
    const API_URL = "http://172.20.10.12:3000";
    const [ShowAll, setShowAll] = React.useState({label : "", list : []});
    const { request, data, loading, error } = useApi<courses>(API_URL || " ");
    const [ForYouCourses, setForYouCourses] = React.useState([] as any);

    


    useEffect(() => {
        const fetchCourses = async () => {
            const forYouCourses = await request("/courses", "GET", null, {Authorization : `Bearer ${await AsyncStorage.getItem("token")}`});
            setForYouCourses(forYouCourses);
            if (!forYouCourses || !forYouCourses.courses){
                return;
            }
            
        } 
        fetchCourses();

    }, []);

    const SportsList = [

        {
            label : 'yoga',
            img : 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label : 'Bike',
            img : 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label : 'Fitness',
            img : 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label : 'Swimming',
            img : 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        }
    ]
    
    if (ShowAll.list.length > 0) {
        return(
        <View style = {styles.container}>
            <View style = {{marginTop : "20%", marginBottom : "5%", marginLeft : "5%"}}>
                <TouchableOpacity onPress={() => setShowAll({label : "", list : []})}><Back style = {{marginLeft : "-5%"}}></Back></TouchableOpacity>
                <CustomText style = {{fontWeight : "bold", fontSize : 32}}>{ShowAll.label}</CustomText>
            </View>
            <CoursesList courses={ForYouCourses} setShow={setShowAll} label=""></CoursesList>
        </View>);
    }


    return (
        <View style={styles.container}>
            <View style = {{alignSelf: "center", marginTop : "20%", marginBottom : "5%"}}>
                <SearchBar></SearchBar>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={{height : 20}}></View>
                <SafeAreaView>
                <ScrollView  showsHorizontalScrollIndicator={false} horizontal = {true} contentContainerStyle= {{gap : 10, marginLeft : "5%"}}>
                {
                    SportsList.map((sport, index) => (
                        <SportsPin key={index} label={sport.label} img={sport.img} />
                    ))
                }
                </ScrollView>
                </SafeAreaView>
                <View style = {{marginLeft : "5%"}}>
                    <MiniCoursesList setShow={setShowAll} courses={ForYouCourses} label = "For you"></MiniCoursesList>
                </View> 
                <View style = {{height : 20}}></View>
                <View style = {{marginLeft : "5%"}}>
                    <MiniCoursesList setShow={setShowAll} courses={ForYouCourses} label = "Liked"></MiniCoursesList>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'white',
    },

});