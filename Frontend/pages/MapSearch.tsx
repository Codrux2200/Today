import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { CustomText } from '../utils/text/text';
import { SearchBar } from '../utils/searchbar/searchbar';
import { CreditPin } from '../utils/creditsView/creditpin';
import Credit from "../assets/credit.svg";
import { Switch } from '../utils/switch/switch';

export const MapSearch = () => {

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

    return(
            <MapView
                style={{ height: '100%', width: '100%' }}
                initialRegion={{
                    latitude: 34.002015,
                    longitude: -6.853741,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    ForYouCourses.map((course) => (
                        <Marker
                            key={course._id}
                            coordinate={{ latitude: course.location.lat, longitude: course.location.long }}
                        >
                            <View style={{ width: 48, height: 65, flexDirection : "column", justifyContent : "space-between", alignItems : "center" }}>
                            <View style = {{  padding : 7 ,top: 15, zIndex : 1 ,height : 28, width : 38, backgroundColor : 'white', borderRadius : 100, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', gap : 3}}>
                            <CustomText style = {{fontSize : 10, color : 'black', textAlign : 'center'}}>20</CustomText>
                            <Credit></Credit>
                        </View>
                                <View style = {{width : 48, height : 48, backgroundColor : "white", borderRadius : 100, overflow : "hidden", borderColor : "white", borderWidth : 2}}>
                                    <Image source={{ uri: course.img }} style={{ width: 48, height: 48 }} />
                                </View>
                                <View style = {{width : 15, height : 15, backgroundColor : "white", borderRadius : 100, alignItems : "center", justifyContent : "center"}}>
                                    <View style = {{width : 10, height : 10, backgroundColor : "rgb(69,151,247)", borderRadius : 100}}>
                                        <CustomText></CustomText>
                                    </View>
                                </View>
                            </View>
                        </Marker>
                    ))
                }

            <View style = {{marginTop : "20%"}}></View>
            <Switch></Switch>
            <View style = {{height : 20}}></View>
            <View style = {[{alignSelf : "center"}, styles.shadowBox]}>
            <SearchBar color='white'></SearchBar>
            </View>
            </MapView>

    );
}

const styles = StyleSheet.create({
    shadowBox: {
        borderRadius: 20,
        shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
        shadowOffset: { width: 0, height: 1 }, // Déplacement horizontal et vertical de l'ombre
        shadowOpacity: 0.4, // Transparence de l'ombre (0 à 1)
        shadowRadius: 5, // Rayon de l'ombre (effet de flou)
        elevation: 5, // Ombre pour Android
      },

});