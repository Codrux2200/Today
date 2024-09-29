import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Switch from '../../libs/Switch';
import { useState } from 'react';
import SearchLine from '../../libs/SearchLine';
import Card from '../../libs/Card';
import Menu from '../../libs/menu';
import AbsolutMenu from '../../libs/AbsolutMenu';
import { FontAwesome5 } from '@expo/vector-icons';

export function Home() {
    const [externselected, setexternselected] = useState("");
    return(
        <View>
            <AbsolutMenu></AbsolutMenu>
        <ScrollView style={{backgroundColor : "#F5F6F9"}}>
            <View style= {{top : 80, marginLeft : 20, marginRight : 20}}>
                <View style = {{display : 'flex', alignItems : "flex-end", marginBottom : 30, flexDirection : "row", justifyContent : "space-between"}}>
                <View style = {styles.coinView}>
                    <Text style = {{color : "#FE7A36", fontWeight : "bold", fontSize : 18}}>Crédits</Text>
                <Text style = {{fontSize : 18, fontWeight : "bold"}}>568</Text>               
                    </View>
                    <Switch text1='Home' text2='Wellness' setexternselected={setexternselected}></Switch>
                </View>
                <View style = {{marginBottom : 15}}>
                <Text style={{fontSize : 40}}>hello! <Text style={{fontWeight : "bold"}}>Rafael.</Text></Text>
                <Text>take a look at the available Gyms and Sessions</Text>
                </View>
                <View>
                    <SearchLine></SearchLine>
                    <Menu></Menu>
                    <View style={styles.container}>
                        <View style = {{display : 'flex', flexDirection : "row", justifyContent : "space-between"}}>
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>Popular Courses</Text>  
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>See All</Text>
                        </View>
                        <ScrollView horizontal = {true}>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                        </ScrollView>
                    </View>

                    <View style={styles.container}>
                        <View style = {{display : 'flex', flexDirection : "row", justifyContent : "space-between"}}>
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>New Courses</Text>  
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>See All</Text>
                        </View>
                        <ScrollView horizontal = {true}>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.container}>
                        <View style = {{display : 'flex', flexDirection : "row", justifyContent : "space-between"}}>
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>Upcoming Courses</Text>  
                            <Text style = {{fontSize : 18, fontWeight : "bold"}}>See All</Text>
                        </View>
                        <ScrollView horizontal = {true}>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                            <Card title="Card Title" content="Card Content"></Card>
                        </ScrollView>
                    </View>

            </View>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F6F9",
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
    },
    cardContainer: {
        flexDirection: 'row',
    },
});