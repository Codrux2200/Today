import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from '../utils/text/text';
import { Switch } from '../utils/switch/switch';
import { SearchBar } from '../utils/searchbar/searchbar';
import { CoursesListTime } from '../utils/courseviewtime/courseviewtime';

export const ListSearch = () => {
    const [selectedDay, setSelectedDay] = useState(0); // 0 représente aujourd'hui
    const [ShowAll, setShowAll] = useState("");
    const ForYouCourses = [
        {
            "_id": "1",
            "Title": "Yoga Matinal",
            "date": "2025-02-01T08:00:00Z",
            "private": false,
            "memberMax": 15,
            "memberMin": 5,
            "status": true,
            "location": { "lat": 34.020882, "long": -6.84165 }, // Quartier Hassan, Rabat
            "by": "JohnDoe",
            "members": "8",
            "note": [
              { "note": 4, "by": "Alice", "comment": "Très relaxant" },
              { "note": 5, "by": "Bob", "comment": "Parfait pour bien commencer la journée" }
            ],
            "price": 20,
            "img": "https://us.123rf.com/450wm/nikolasjkd/nikolasjkd1803/nikolasjkd180300014/98688918-fille-athl%C3%A9tique-sexy-travaillant-dans-la-salle-de-gym-fitness-femme-faisant-de-l-exercice-sexy.jpg?ver=6",
            "completed": false
          },
          {
            "_id": "2",
            "Title": "HIIT Intensif",
            "date": "2025-02-02T18:00:00Z",
            "private": true,
            "memberMax": 10,
            "memberMin": 3,
            "status": true,
            "location": { "lat": 34.01325, "long": -6.84479 }, // Quartier Agdal, Rabat
            "by": "FitnessPro",
            "members": "7",
            "note": [
              { "note": 5, "by": "Chris", "comment": "Super intense, j'ai adoré" }
            ],
            "price": 25,
            "img": "https://us.123rf.com/450wm/nikolasjkd/nikolasjkd1803/nikolasjkd180300014/98688918-fille-athl%C3%A9tique-sexy-travaillant-dans-la-salle-de-gym-fitness-femme-faisant-de-l-exercice-sexy.jpg?ver=6",
            "completed": false
          },
          {
            "_id": "3",
            "Title": "Cours de Box.",
            "date": "2025-02-03T19:00:00Z",
            "private": false,
            "memberMax": 20,
            "memberMin": 5,
            "status": true,
            "location": { "lat": 33.589886, "long": -7.603869 }, // Quartier Maarif, Casablanca
            "by": "BoxingMaster",
            "members": "15",
            "note": [
              { "note": 4, "by": "Emma", "comment": "Très bon coach !" }
            ],
            "price": 30,
            "img": "https://us.123rf.com/450wm/nikolasjkd/nikolasjkd1803/nikolasjkd180300014/98688918-fille-athl%C3%A9tique-sexy-travaillant-dans-la-salle-de-gym-fitness-femme-faisant-de-l-exercice-sexy.jpg?ver=6",
            "completed": false
          },
          {
            "_id": "4",
            "Title": "Pilates",
            "date": "2025-02-04T17:00:00Z",
            "private": false,
            "memberMax": 12,
            "memberMin": 4,
            "status": true,
            "location": { "lat": 33.57365, "long": -7.620454 }, // Quartier Ain Diab, Casablanca
            "by": "PilatesExpert",
            "members": "10",
            "note": [
              { "note": 5, "by": "Sarah", "comment": "Idéal pour les débutants" }
            ],
            "price": 22,
            "img": "https://us.123rf.com/450wm/nikolasjkd/nikolasjkd1803/nikolasjkd180300014/98688918-fille-athl%C3%A9tique-sexy-travaillant-dans-la-salle-de-gym-fitness-femme-faisant-de-l-exercice-sexy.jpg?ver=6",
            "completed": false
          },
          {
            "_id": "5",
            "Title": "Zumba",
            "date": "2025-02-05T18:30:00Z",
            "private": false,
            "memberMax": 30,
            "memberMin": 8,
            "status": true,
            "location": { "lat": 34.002015, "long": -6.853741 }, // Quartier Souissi, Rabat
            "by": "ZumbaTrainer",
            "members": "20",
            "note": [
              { "note": 5, "by": "Sophia", "comment": "Ambiance au top !" }
            ],
            "price": 18,
            "img": "https://us.123rf.com/450wm/nikolasjkd/nikolasjkd1803/nikolasjkd180300014/98688918-fille-athl%C3%A9tique-sexy-travaillant-dans-la-salle-de-gym-fitness-femme-faisant-de-l-exercice-sexy.jpg?ver=6",
            "completed": false
          }
    ]



    const getDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();

            days.push({ dayName, dayNumber });
        }

        return days;
    };

    const days = getDays();

    return (
        <View>
            <View style={{ marginTop: '20%' }}></View>
            <Switch />
            <View style={{ height: 20 }}></View>
            <View style={[{ alignSelf: 'center' }, styles.shadowBox]}>
                <SearchBar />
            </View>



            <View style={{ height: 30 }}></View>
                <View style={styles.navbarContainer}>
                    {days.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDay(index)}
                            style={styles.dayContainer}
                        >
                            <CustomText style={[
                                styles.dayText,
                                selectedDay === index && styles.selectedDayText,
                            ]}>
                                {day.dayName} {day.dayNumber}
                            </CustomText>
                            {selectedDay === index && <View style={styles.underline} />}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style = {{width : "100%"}}>
                <CoursesListTime setShow={setShowAll} courses={ForYouCourses} label = "Liked"></CoursesListTime>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowBox: {
        borderRadius: 20,
        shadowColor: '#3F3F3F',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    navbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 38,
    },
    dayContainer: {
        alignItems: 'center',
        height : 38,
        justifyContent : "space-between"
    },
    dayText: {
        fontSize: 16,
        color: 'rgb(110,110,110)',
    },
    selectedDayText: {
        color: '#000',
        fontWeight: 'bold',
    },
    underline: {
        height: 3,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        backgroundColor: 'rgb(69,151,247)',
        width: '100%',
        marginTop: 4,
    },
});
