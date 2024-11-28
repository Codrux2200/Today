import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Switch from '../../libs/Switch';
import { SearchLine } from '../../libs/SearchLine';
import Categories from '../../libs/Categories';
import CourseService from '../../database-conect/coursesapi'; // Ensure CourseService is correctly imported
import Menu from '../../libs/menu';
import Constants from 'expo-constants';

const initialCategories = [
    {
        title: 'Popular Courses',
        items: [
            { id: 1, content: 'Item 1' },
            { id: 2, content: 'Item 2' },
            { id: 3, content: 'Item 3' },
        ],
    },
    {
        title: 'New Courses',
        items: [
            { id: 4, content: 'Item 4' },
            { id: 5, content: 'Item 5' },
            { id: 6, content: 'Item 6' },
        ],
    },
    {
        title: 'Courses for you',
        items: [
            { id: 4, content: 'Item 4' },
            { id: 5, content: 'Item 5' },
            { id: 6, content: 'Item 6' },
        ],
    },
];

const Home = () => {
    const [externselected, setexternselected] = useState("");
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const courseService = new CourseService(process.env.MONGOURI || 'defaultMongoURI');
                console.log(process.env.MONGOURI);
                const popularCourses = await courseService.getCoursesByPopularity();
                const coursesToday = await courseService.getCoursesByDate('today');
                const coursesNextTwoDays = await courseService.getCourses();
                setCategories([
                    {
                        title: 'Popular Courses',
                        items: popularCourses.map((course: any) => ({
                            id: course._id,
                            content: course,
                        })),
                    },
                    {
                        title: 'New Courses',
                        items: coursesToday.map((course: any) => ({
                            id: course._id,
                            content: course,
                        })),
                    },
                    {
                        title: 'Courses for you',
                        items: coursesNextTwoDays.map((course: any) => ({
                            id: course._id,
                            content: course,
                        })),
                    },
                ]);
            } catch (error) {
                console.error('Error fetching courses:', error);
                // On peut mettre à jour ici un état d'erreur si nécessaire
            } finally {
                setLoading(false); // Arrêt du chargement
            }
        };
        console.log("fetching courses");
        fetchCourses();
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois au démarrage


    return(
        <View style= {styles.container}>
            <View style= {{marginTop : 90}}></View>
            <View style = {styles.switchContainer}>
                <Switch text1='Health' text2='Wellness' setexternselected={setexternselected}></Switch>
            </View>
            <View style = {styles.centerelement}>
                <SearchLine></SearchLine></View>
            <Menu></Menu>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Categories initialCategories={categories} />
            )}
            <View style = {{height : 130}}></View>
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
        backgroundColor: "#f5f6f9",
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
        paddingRight: 20,
    },
    cardContainer: {
        flexDirection: 'row',
    },
});

export default Home;