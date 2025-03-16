import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CustomText } from '../utils/text/text';
import Star from "../assets/star_blue.svg";
import Coin from "../assets/credit.svg";
import MapView, { Marker } from 'react-native-maps';
import Credit from "../assets/credit.svg";
import { CustomButton } from '../utils/button/TodayButton';
import Back from "../assets/bigback.svg";
import Heart from "../assets/heart.svg";
import Share from "../assets/share.svg";
import { useNavigation, RouteProp } from '@react-navigation/native';
import useApi from '../hooks/useApi';
import { API_URL } from '../utils/courseviewtime/courseviewtime';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Profil: { id: string };
};
type ProfilScreenRouteProp = RouteProp<RootStackParamList, 'Profil'>;
type ProfilPageProps = { route: ProfilScreenRouteProp };

interface Course {
    _id: string;
    img: string;
    title: string;
    description: string;
    by: string;
    note: number[];
    price: number;
    private: boolean;
    location: {
        lat: number;
        long: number;
    };
}

interface Reviews{
    reviews : [] | null;
}

export const ProfilPage = (params: any) => {
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    const { request : courserequest, data, loading : courseloading, error : courseerror } = useApi<Course>(API_URL);
    const { request : reviewsrequest, data : reviewsdata, loading : reviewsloading, error : reviewserror } = useApi<Reviews>(API_URL);
    const [course, setCourse] = useState({} as Course | null);
    const [note, setNote] = useState(0);
    const [reviews, setReviews] = useState([] as unknown as Reviews | null);
    const windowsdimension = useWindowDimensions();
    useEffect(() => {
        const fetchCourse = async () => {
            const coursed = await courserequest(`/courses/${params.route.params.id}`, "GET", null, { Authorization: `Bearer ${await AsyncStorage.getItem("token")}` });
            setCourse(coursed);
        };
        fetchCourse();
        const fetchReviews = async () => {
            const reviewsd = await reviewsrequest(`/reviews/${params.route.params.id}`, "GET", null, { Authorization: `Bearer ${await AsyncStorage.getItem("token")}` });
            if (reviewsd && reviewsd.reviews) {
                setReviews({ reviews: reviewsd.reviews });
            } else {
                setReviews(null);
            }
        }
        fetchReviews();
    }, []);

    useEffect(() => {
        if (reviews && reviews.reviews) {
            let sum = 0;
            reviews.reviews.forEach((review: any) => {
                sum += review.rating;
            });
            setNote(sum / reviews.reviews.length);
        }
    }, [reviews]);

    if (courseloading || reviewsloading) return <ActivityIndicator size="large" color="blue" />;
    if (courseerror) return <CustomText>Erreur : {courseerror}</CustomText>;
    
    if (!course || Object.keys(course).length === 0 ) return <CustomText>Aucune donnée disponible.</CustomText>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "20%" }}>
                    <Heart />
                    <Share />
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.pictureView}>
                    <Image
                        style={{ height: 200, width: "99%", maxWidth: 400, borderRadius: 12, alignSelf: "center" }}
                        source={{ uri: course.img }}
                    />
                    <CustomText style={{ fontWeight: "400", fontSize: 24, marginTop: "5%" }}>{course.title}</CustomText>
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Star fill={"blue"} />
                        <CustomText>{note.toPrecision(2)} · {reviews?.reviews?.length} reviews · {course.private ? "Collective course" : "Private course"}</CustomText>
                    </View>
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Coin />
                        <CustomText style={{ fontWeight: "400", fontSize: 16 }}>
                            {course.price + " · Rabat, Morocco"}
                        </CustomText>
                    </View>
                    <View style={{ height: 10 }} />
                </View>

                <View style={styles.ByView}>
                    <View style={{ width: "70%" }}>
                        <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>by {course.by}</CustomText>
                        <CustomText style={{ color: "rgb(110,110,110)" }}>
                            Angle Rue Raiss Mohammed Baina et, Boulevard Akrach, Rabat 10170, Maroc
                        </CustomText>
                    </View>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 100 }}
                        source={{ uri: "https://static.medias24.com/content/uploads/2016/12/cityclub.jpg?x42185" }}
                    />
                </View>

                <View style={styles.pictureView}>
                    <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>About the session</CustomText>
                    <View style={{ height: 10 }} />
                    <CustomText ellipsizeMode="tail" numberOfLines={expanded ? undefined : 8}>
                        {course.description}
                    </CustomText>
                    <CustomText style={{ fontWeight: "bold" }} onPress={() => setExpanded(!expanded)}>
                        {expanded ? "Show Less" : "Show More"}
                    </CustomText>
                </View>

                <View style={styles.pictureView}>
                    <CustomText style={{ fontWeight: "bold", fontSize: 16 }}>Location</CustomText>
                    <View style={{ height: 10 }} />
                    <MapView
                        style={{ height: 116, width: windowsdimension.width - 30, borderRadius: 16 }}
                        initialRegion={{
                            latitude: course.location.lat - 0.001,
                            longitude: course.location.long - 0.001,
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

            <View style={styles.footer}>
                <CustomButton title={"View Schedule"} color={"rgb(69,151,247)"} width={"100%"} height={58} textcolor="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    header: { height: 100, flexDirection: "row", justifyContent: "space-between", padding: "3%", alignItems: "flex-end" },
    scrollView: { flex: 1, padding: "3%" },
    footer: { height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
    pictureView: { borderBottomColor: "rgb(227,227,227)", borderBottomWidth: 1, paddingBottom: 20 },
    ByView: { borderBottomWidth: 1, borderBottomColor: "rgb(227,227,227)", flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 },
});

export default ProfilPage;