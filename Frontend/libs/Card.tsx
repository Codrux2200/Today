import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
interface CardProps {
    title: string;
    content: string;
}

const fakeData = {  
    title : "Yoga courses",
    coin : 100,
    author: "John Doe",
    date : "2024-09-29",
    state : 1,
    location : "Rabat",
    grade : 4.5,
    isFavorite : false,
    picture : "https://img.freepik.com/photos-premium/jeune-femme-debout-dans-position-exercice-yoga-girl-balancing-pratique-exercices-etirement-au-cours-yoga-elle-est-debout-jambe_120968-252.jpg"

};

const Card: React.FC<CardProps> = ({ title, content }) => {


    function getformattedDate(stringdate : string){
        const fakeData = { date: "15.12.2021 13:35" };
        const [day, month, year] = fakeData.date.split(" ")[0].split(".");
        const [hour, minute] = fakeData.date.split(" ")[1].split(":");
        const date = new Date(stringdate);
        
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
        };
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        // Comparer les dates pour vérifier "Today" ou "Tomorrow"
        const isToday = date.toDateString() === today.toDateString();
        const isTomorrow = date.toDateString() === tomorrow.toDateString();
        
        // Obtenir le jour de la semaine
        const dayOfWeekOptions = { weekday: 'long' as 'long' | 'short' | 'narrow' }; // Obtenir le nom complet du jour (ex: "Monday", "Tuesday")
        const dayOfWeek = date.toLocaleDateString([], dayOfWeekOptions);
        
        // Formater la chaîne finale
        let formattedDate;
        if (isToday) {
            formattedDate = `Today, at ${date.toLocaleTimeString([], timeOptions)}`;
        } else if (isTomorrow) {
            formattedDate = `Tomorrow, at ${date.toLocaleTimeString([], timeOptions)}`;
        } else {
            formattedDate = `${dayOfWeek}, ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], timeOptions)}`;
        }
        
        return formattedDate;
        

    }


    function statefromnumber(state : number){
        if(state == 1){
            return "Private";
        } else if (state == 2){
            return "Public";
        }

    }

    return (
        <View style={styles.card}>
            <View style = {{ width: 215, height: 120}}> 
                <Image source={{ uri: fakeData.picture }} style={{ width: 215, height: 120, borderRadius : 15, position : "absolute" }} />
                <View style = {{display : "flex", paddingLeft : 20, paddingTop : 10, flexDirection : 'row', justifyContent : "space-between", paddingRight : 20}}>
                    <View style = {{width : 36, height : 16, backgroundColor : "white", borderRadius : 60, display : 'flex', alignItems : "center", flexDirection : "row",
                        padding : 2, gap : 2,
                    }}>
                        <FontAwesome5 name="star" size={10} color="#C9D8E2" solid />
                        <Text style = {{fontSize : 10, fontWeight : "bold"}}>{fakeData.grade}</Text></View>
                        <View style = {{borderRadius : 100, borderWidth : 1, borderColor : "white", padding : 3}}>
                        <FontAwesome5 name="star" size={15} color="white" />
                        </View>
                </View>
            </View>
            <View style = {styles.horizontal}>
                <View style = {{padding: 0}}>
                    <Text style={styles.title}>{fakeData.title}</Text>
                    <Text style = {{fontSize : 10}}>by <Text style={{fontWeight : "bold"}}>{fakeData.author}</Text></Text>
            </View>
            </View>
            <View>
                <View style = {{display : "flex", flexDirection : "row", alignItems : "center", gap : 5}}>
                    <FontAwesome5 name="calendar" size={13} color="#C9D8E2" solid />
                    <Text>{getformattedDate(fakeData.date)}</Text>
                </View>
            <View style = {styles.horizontal}>
                <View style = {{display : "flex", flexDirection : "row", alignItems : "center", gap : 5}}>
                    <FontAwesome5 name="user-lock"></FontAwesome5>
                    <Text>{statefromnumber(fakeData.state)}</Text>
                </View>
                <View style = {{display : "flex", flexDirection : "row", alignItems : "center", gap : 5}}>
                    <FontAwesome5 name="map-marker-alt"></FontAwesome5>
                    <Text>{fakeData.location}</Text>
                </View>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 22,
        width: 231,
        height: "auto",
        display : 'flex',
        justifyContent : "space-between",
    },
    horizontal: {
        marginTop : 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom : 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
        color: '#C9D8E2',
        fontWeight : "bold",
    },
});

export default Card;