import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CustomText } from '../utils/text/text';
import { SearchBar } from '../utils/searchbar/searchbar';
import { SportsPin } from '../utils/pins/SportsPin';

import { MiniCoursesList } from '../utils/minicourseview/minicourseview';


export const Home = () => {

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


    return (
        <View style={styles.container}>
            <View style = {{alignSelf: "center", marginTop : "20%", marginBottom : "5%"}}>
                <SearchBar></SearchBar>
            </View>
            <ScrollView>
                <View style={{height : 20}}></View>
                <SafeAreaView>
                <ScrollView horizontal = {true} contentContainerStyle= {{gap : 10, marginLeft : "5%"}}>
                {
                    SportsList.map((sport, index) => (
                        <SportsPin key={index} label={sport.label} img={sport.img} />
                    ))
                }
                </ScrollView>
                </SafeAreaView>
                <View style = {{marginLeft : "5%"}}>
                    <MiniCoursesList courses={ForYouCourses} label = "For you"></MiniCoursesList>
                </View> 
                <View style = {{height : 20}}></View>
                <View style = {{marginLeft : "5%"}}>
                    <MiniCoursesList courses={ForYouCourses} label = "Liked"></MiniCoursesList>
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