import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Switch from '../../libs/Switch';
import { SearchLine } from '../../libs/SearchLine';
import Categories from '../../libs/Categories';
import CourseService from '../../database-conect/coursesapi'; // Ensure CourseService is correctly imported

const initialCategories = [
    {
        title: 'Today Shedule',
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

const CalendarPage = () => {
    const [externselected, setexternselected] = useState("");
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(true); // État pour le chargement des données

    // Appel à l'API pour récupérer les données de cours
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true); // Lancement du chargement
            try {
                // Appel aux services pour récupérer les cours
                const courseService = new CourseService("http://172.20.10.2:3000");
                const popularCourses = await courseService.getCoursesByDate('today')
                const coursesToday = await courseService.getCoursesByDate('nextTwoDays');
                const coursesNextTwoDays = await courseService.getCoursesByDate('previous');

                // Mise à jour des catégories avec les cours récupérés
                setCategories([
                    {
                        title: 'Today Courses',
                        items: popularCourses.map((course: any) => ({
                            id: course._id,
                            content: course,
                        })),
                    },
                    {
                        title: 'Upcoming Courses',
                        items: coursesToday.map((course: any) => ({
                            id: course._id,
                            content: course,
                        })),
                    },
                    {
                        title: 'Previous Courses',
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

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 90 }}></View>
            <View style={styles.switchContainer}>
                <Switch text1="Health" text2="Wellness" setexternselected={setexternselected} />
            </View>
            <View style={styles.centerelement}>
                <SearchLine />
            </View>

            {/* Affichage d'un loader tant que les données ne sont pas chargées */}
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
    container: {
        flex: 1,
        backgroundColor: '#f5f6f9',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    switchContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 30,
        paddingRight: 20,
    },
    centerelement: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CalendarPage;
