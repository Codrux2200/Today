import React, { useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Image,
} from 'react-native';
import { CustomText } from '../utils/text/text';
import { FloatingTitleTextInputField } from "../utils/floating-input/floatinginput"; // Ajuste le chemin d'importation
import LoupeBlance from "../assets/loupewhite.svg";
import Loupe from "../assets/loupe.svg";
import { Switch } from '../utils/switch/switch';
import Croix from "../assets/croix.svg";
import Loca from "../assets/loca.svg";
import { CustomButton } from '../utils/button/TodayButton';
import { useNavigation } from '@react-navigation/native';

const FilterPage = () => {
    const navigation = useNavigation();
    const [filters, setFilters] = useState({
        where: "Select location",
        when: "Select time",
        what: "Any activities",
    });

    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleFilter = (key: string) => {
        if (activeFilter === key) {
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setActiveFilter(null));
        } else {
            setActiveFilter(key);
            Animated.timing(animatedHeight, {
                toValue: 400,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleSelect = (filterKey: string, value: string) => {
        setFilters((prev) => ({ ...prev, [filterKey]: value }));
        Animated.timing(animatedHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setActiveFilter(null));
    };

    const handleClearAll = () => {
        setFilters({
            where: "Select location",
            when: "Select time",
            what: "Any activities",
        });
        setSearchQuery("");
    };

    const handleSearch = () => {
        console.log("Searching with selected filters:", filters);
        navigation.goBack();
    };

    const generateTimeSlots = (startTime: string, endTime: string) => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const slots = [];

        while (start <= end) {
            const hours = start.getHours().toString().padStart(2, "0");
            const minutes = start.getMinutes().toString().padStart(2, "0");
            slots.push(`${hours}:${minutes}`);
            start.setMinutes(start.getMinutes() + 30);
        }

        return slots;
    };

    const whenOptions = generateTimeSlots("09:00", "18:00");

    const cities = ["Paris", "New York", "Tokyo", "Rabat"];

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SportsList = [
        {
            label: 'Yoga',
            img: 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label: 'Bike',
            img: 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label: 'Fitness',
            img: 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        },
        {
            label: 'Swimming',
            img: 'https://www.modesettravaux.fr/wp-content/uploads/modesettravaux/2023/10/shutterstock_2492220277-1-615x410.jpg'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={{ marginTop: "20%" }}></View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                <View style={{ width: "5%" }}></View>
                <Switch></Switch>
                <TouchableOpacity onPress={() => {navigation.goBack()}} style={{ borderColor: "rgb(228,228,228)", width: 36, height: 36, borderWidth: 1, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                    <Croix></Croix>
                </TouchableOpacity>
            </View>

            <View style={styles.scrollView}>
                {Object.entries(filters).map(([key, value], index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.filterRow,
                            {
                                marginTop: activeFilter === key ? 20 : 0,
                                marginBottom: activeFilter === key ? 20 : 0,
                                borderBottomLeftRadius: index === Object.entries(filters).length - 1 ? 20 : 0,
                                borderBottomRightRadius: index === Object.entries(filters).length - 1 ? 20 : 0,
                                borderTopRightRadius: index === 0 ? 20 : 0,
                                borderTopLeftRadius: index === 0 ? 20 : 0,
                                borderRadius: 20,
                            },
                        ]}
                        onPress={() => toggleFilter(key)}
                    >
                        <View style={styles.rowContent}>
                            {activeFilter === key ? (
                                <CustomText style={styles.activeText}></CustomText>
                            ) : (
                                <>
                                    <CustomText style={styles.filterLabel}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}?
                                    </CustomText>
                                    <CustomText style={styles.filterValue}>{value}</CustomText>
                                </>
                            )}
                        </View>

                        {activeFilter === key && (
                            <Animated.View style={[styles.optionsContainer, { height: animatedHeight }]}>
                                {key === "when" && (
                                    <View>
                                        <CustomText style={styles.title}>When ?</CustomText>
                                        <View style={{ height: 20 }}></View>
                                    </View>
                                )}
                                {key === "where" && (
                                    <View>
                                        <CustomText style={styles.title}>Where</CustomText>
                                        <View style={{ height: 60, flexDirection: "row", alignItems: "center", backgroundColor: "rgb(247,247,247)", borderRadius: 12, padding: 7, gap: 10 }}>
                                            <Loupe></Loupe>
                                            <FloatingTitleTextInputField
                                                border={false}
                                                title="Search City"
                                                attrName="searchQuery"
                                                value={searchQuery}
                                                updateMasterState={(attrName, updatedValue) => {
                                                    setSearchQuery(updatedValue);
                                                }}
                                                textInputStyles={{}}
                                            />
                                        </View>
                                        <View style={{ height: 20 }}></View>
                                    </View>
                                )}
                                {key === "what" && (
                                    <View>
                                        <CustomText style={styles.title}>What?</CustomText>
                                        <View style={{ height: 20 }} />
                                        <View style={{ height: 60, flexDirection: "row", alignItems: "center", backgroundColor: "rgb(247,247,247)", borderRadius: 12, padding: 7, gap: 10 }}>
                                            <Loupe />
                                            <FloatingTitleTextInputField
                                                border={false}
                                                title="Search Sport"
                                                attrName="searchQuery"
                                                value={searchQuery}
                                                updateMasterState={(attrName, updatedValue) => {
                                                    setSearchQuery(updatedValue);
                                                }}
                                                textInputStyles={{}}
                                            />
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </View>
                                )}
                                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled style={{ backgroundColor: "white" }}>
                                    {key === "when" && (
                                        whenOptions.map((time, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[styles.option, { marginBottom: 20 }]}
                                                onPress={() => handleSelect(key, time)}
                                            >
                                                <CustomText style={styles.optionText}>{time}</CustomText>
                                            </TouchableOpacity>
                                        ))
                                    )}

                                    {key === "where" && (
                                        <>
                                            {filteredCities.map((city, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[styles.option, { gap : 10, borderWidth : 0, padding : 0, marginBottom : 20 }]}
                                                    onPress={() => handleSelect(key, city)}
                                                >
                                                    <View style = {{width : 56, height : 56, borderRadius : 16, backgroundColor : "rgb(247,247,247)", alignItems : "center", justifyContent : "center"}}>
                                                    <Loca></Loca>
                                                    </View>
                                                    <CustomText style={styles.optionText}>{city}</CustomText>
                                                </TouchableOpacity>
                                            ))}
                                        </>
                                    )}

                                        {key === "what" && (
                                        <>  
                                            <TouchableOpacity activeOpacity={1} style={styles.sportListContainer}>
                                            {SportsList.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                                                <TouchableOpacity onPress={() => handleSelect(key, item.label)} key={index} style={styles.sportItem}>
                                                    <Image source={{ uri: item.img }} style={styles.sportImage} />
                                                    <CustomText style={styles.sportLabel}>{item.label}</CustomText>
                                                </TouchableOpacity>
                                            ))}
                                        </TouchableOpacity>
                                        </>
                                    )}
                                </ScrollView>
                            </Animated.View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
            <TouchableOpacity onPress={() => {handleClearAll()}} style={styles.clearButton}>
                    <CustomText style={[styles.footerText, {color : "black", fontWeight : "100"}]}>Clear all</CustomText>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.searchButton} onPress={handleSearch}>
                    <LoupeBlance width={15} height={15} ></LoupeBlance>
                    <CustomText style={styles.footerText}>Search</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollView: {
        flex: 1,
        marginTop: 30,
    },
    filterRow: {
        width: "90%",
        alignSelf: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "rgb(234,234,234)",
        borderWidth: 1,
    },
    rowContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    filterLabel: {
        fontSize: 18,
        color: "#333",
    },
    filterValue: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    activeText: {
        fontSize: 16,
        color: "#007bff",
        fontWeight: "500",
    },
    optionsContainer: {
        overflow: "hidden",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    option: {
        borderWidth: 1,
        borderColor : "rgb(228,228,228)",
        padding: 15,
        flexDirection : "row",
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: "black",
        alignSelf : "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingBottom: 20,
    },
    clearButton: {
        padding: 12,
        backgroundColor: "white",
        borderColor : "rgb(228,228,228)",
        width : 127,
        height: 54,
        borderWidth : 1,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        padding: 12,
        backgroundColor: "rgb(69,151,247)",
        width : 127,
        height: 54,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection : "row",
        gap : 10,
    },
    footerText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    sportListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sportItem: {
        width: '48%',
        marginBottom: 20,
        alignItems: 'center',
    },
    sportImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    sportLabel: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default FilterPage;
