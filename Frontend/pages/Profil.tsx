import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { CustomText } from '../utils/text/text';
import Star from "../assets/star_blue.svg";
import Coin from "../assets/credit.svg";
import MapView, { Marker } from 'react-native-maps';
import Credit from "../assets/credit.svg";
import { CustomButton } from '../utils/button/TodayButton';
import Back from "../assets/bigback.svg";
import Heart from  "../assets/heart.svg"
import Share from "../assets/share.svg";
import { useNavigation } from '@react-navigation/native';
export const ProfilPage = () => {
    const [extanded, setextanded] = useState(false);
    const navigation = useNavigation();
    const course = {
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
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Back></Back>
                    </TouchableOpacity>
                <View style = {{flexDirection : "row", justifyContent : "space-between", width : "20%"}}>
                    <Heart></Heart>
                    <Share></Share>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.pictureView}>
                    <Image
                        style={{ height: 200, width: "99%", maxWidth: 400, borderRadius: 12, alignSelf: "center" }}
                        source={{ uri: course.img }}
                    />
                    <CustomText style={{ fontWeight: "400", fontSize: 24, marginTop: "5%" }}>{course.Title}</CustomText>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Star fill={"blue"} />
                        <CustomText style={{ fontWeight: "400", fontSize: 16 }}>
                            {"4.9 · " + course.note.length + " Reviews · " + (!course.private ? "Collective course" : "Private course")}
                        </CustomText>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Coin />
                        <CustomText style={{ fontWeight: "400", fontSize: 16 }}>{course.price + " · Rabat, Morocco"}</CustomText>
                    </View>
                    <View style={{ height: 10}}></View>
                </View>
                <View style={styles.ByView}>
                    <View style={{ width: "70%" }}>
                        <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>by {course.by}</CustomText>
                        <CustomText style={{ color: "rgb(110,110,110)" }}>
                            Angle Rue Raiss Mohammed Baina et, Boulevard Akrach, Rabat 10170, Maroc
                        </CustomText>
                    </View>
                    <View style={{}}>
                        <Image
                            style={{ width: 60, height: 60, borderRadius: 100 }}
                            source={{ uri: "https://static.medias24.com/content/uploads/2016/12/cityclub.jpg?x42185" }}
                        />
                    </View>
                </View>
                <View style={styles.pictureView}>
                    <View style={{ height: 20 }}></View>
                    <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>About the session</CustomText>
                    <View style={{ height: 10 }}></View>
                    <CustomText ellipsizeMode="tail" numberOfLines={extanded ? undefined : 8}>
                        At our gym, every day brings a new challenge with our WODs (Workout of the Day)! A WOD is a structured
                        workout designed to push your limits and help you progress in strength, endurance, and overall fitness.
                        ...
                    </CustomText>
                    <View style={{ height: 10 }}></View>
                    <CustomText style={{ fontWeight: "bold" }} onPress={() => setextanded(!extanded)}>
                        {extanded ? "Show Less" : "Show More"}
                    </CustomText>
                </View>
                <View style={styles.pictureView}>
                <View style={{ height: 10 }}></View>
                    <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>Location</CustomText>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <CustomText>Rabat, Morocco</CustomText>
                        <CustomButton
                            title={"Get direction"}
                            width={108}
                            height={32}
                            color="white"
                            borderWidth={true}
                        />
                    </View>
                    <View style={{ height: 10 }}></View>
                    <MapView
                style={{ height: 116, width: useWindowDimensions().width - 30, borderRadius: 16 }}
                initialRegion={{
                    latitude: 34.002015,
                    longitude: -6.853741,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
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
                  </MapView>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style = {[styles.shadowBox, {width : "90%"}]}>
                <CustomButton title={"View Schedule"} color={"rgb(69,151,247)"} width={"100%"} height={58} textcolor="white" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        height: 100,
        flexDirection : "row",
        justifyContent: "space-between",
        padding : "3%",
        alignItems: "flex-end",
        backgroundColor: "white",
    },
    scrollView: {
        flex: 1,
        padding: "3%",
    },
    footer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    pictureView: {
        borderBottomColor: "rgb(227,227,227)",
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    ByView: {
        borderBottomWidth: 1,
        borderBottomColor: "rgb(227,227,227)",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical : 20,
    },
    shadowBox: {
        borderRadius: 20,
        shadowColor: '#3F3F3F',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
});
