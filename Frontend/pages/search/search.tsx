import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import SearchLine from '../../libs/SearchLine';
import Switch from '../../libs/Switch';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import {GlobalText} from '../../libs/GlobalText';

const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
];


const MapCard = () => {
    return (
        <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Courses near you</Text>
            <ImageBackground 
                source={{ uri: 'https://media-assets.wired.it/photos/656446e474583ad7b5dd914e/16:9/w_1328,h_747,c_limit/nuovi%20colori%20di%20google%20maps.png' }} 
                style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}
                imageStyle={{ borderRadius: 15 }}
            >
                <BlurView intensity={50} style={{ padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>View Map </Text>
                </BlurView>
            </ImageBackground>
        </View>
    );
};



const InfoCard = () => {
    return (
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20, minWidth: 370 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Course Information</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                <FontAwesome5Icon name="calendar-alt" size={24} color="black" />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>9:00</Text>
                <Text style={{ fontSize: 16, marginLeft: 5 }}>(40 minutes)</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ }}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Credits</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#C9D8E2" }}>54 COIN /HOUR</Text>
                </View>
                <View style={{ }}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Instructor</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Raphael Alan</Text>
                </View>
            </View>
        </View>
    );
};

const InfoCardList = () => {
    const infoCardsData = [1, 2, 3, 4, 5]; // Example data, replace with actual data if needed

    return (
        <View style = {{}}>
        <ScrollView horizontal style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            {infoCardsData.map((item) => (
                <InfoCard key={item} />
            ))}
        </ScrollView>
        </View>
    );
};





const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthSelector = () => {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState(1);

    useEffect(() => {
        handleMonthChange(selectedMonth);
    }, []);


    const handleMonthChange = (month: React.SetStateAction<string>) => {
        setSelectedMonth(month);
        const date = new Date(2024, months.findIndex(m => m.value === month) + 1, 0);
        const daysArray = Array.from({ length: date.getDate() }, (_, i) => i + 1);
        console.log(daysArray);
        setDaysInMonth(daysArray);
    };

    return (
        <View>
            <View style = {{marginLeft : 20 ,flexDirection : 'row', alignItems : "center", justifyContent : "space-between"}}>

            <TouchableOpacity style = {{top : 15, borderRadius : 10, backgroundColor : 'white', height : 50, alignItems : "center", justifyContent : "space-between", padding : 10, flexDirection : 'row', width : 70}}>
                <FontAwesome5Icon name="keyboard" size={20} color="#C9D8E2" />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color : "#C9D8E2" }}>2</Text>

            </TouchableOpacity>

            <RNPickerSelect
                onValueChange={(itemValue) => handleMonthChange(itemValue)}
                items={months.map((month) => ({ label: month.label, value: month.value }))}
                value={selectedMonth}
                style={pickerSelectStyles}
                Icon={() => {
                    return <Chevron size={2} color="#C9D8E2" />;
                  }}
            />
            </View>


            <FlatList
                horizontal
                data={daysInMonth}
                keyExtractor={(item: { toString: () => any; }) => item.toString()}
                initialNumToRender={daysInMonth.length}
                showsHorizontalScrollIndicator={false} // This line hides the scroll indicator
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {setSelectedDay(item)}} style={[{ alignItems: 'center', margin: 15, padding : 5, minWidth : 40, height : 'auto' }, item == selectedDay ? {backgroundColor : "#C9D8E2", borderRadius : 10} : {}]}>
                        <Text style = {{fontWeight : "bold", fontSize : 20}}>{item}</Text>
                        <Text style = {{fontSize : 16}}>{daysOfWeek[new Date(2024, months.findIndex(m => m.value === selectedMonth), item).getDay()]}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};


const SearchPage = () => {
    const [externselected, setexternselected] = useState("");
    return (
        <ScrollView style={styles.container}>
            <View style= {{marginTop : 90}}></View>
            <View style = {styles.switchContainer}>
            <Switch text1='Health' text2='Wellness' setexternselected={setexternselected}></Switch>
            </View>
            <View style = {styles.centerelement}>
            <SearchLine></SearchLine></View>
            <MonthSelector />
            <InfoCardList/>
            <MapCard />
            <View style={{ height: 100 }}></View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({

    centerelement: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

    },
    container: {
        flex: 1,
        backgroundColor: "#f5f6f9",
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
    switchContainer: {
        display: 'flex',
        alignItems: "flex-end",
        marginBottom: 30,
        paddingRight: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop : 30,
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor : 'white',
        width : 250,
        height : 50,
        borderRadius: 10,
        color: 'black',
        marginRight : 20,
        alignSelf : "flex-end"
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 50,
        right: 35,
      },
});

export default SearchPage;