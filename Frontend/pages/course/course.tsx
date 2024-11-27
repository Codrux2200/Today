import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Touchable, TouchableOpacity, Image } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalText from '../../libs/GlobalText';

const CoursePage = () => {
    const navigation = useNavigation();
    const routes = useRoute();
    const [currentData, setCurrentData] = React.useState<any>(routes.params.data != undefined ? routes.params.data : null);

    useEffect(() => {
        if (routes.params && 'data' in routes.params) {
            setCurrentData(routes.params.data);
            console.log(routes.params.data);
        }
    }, [routes.params]);

    return (
        <ImageBackground 
            source={{ uri: 'https://uk.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F18MddyaNPL1DSDpo6Zqpga%2F70322bad735570ddd0efa6f8cca90f6e%2Fhiit_leggings.jpeg&w=3840&q=90' }} 
            style={styles.background}
        >
            <View style={styles.container}>
                <View style = {styles.TopView}> 
                     <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BlurView style={{
                        bottom: 50, backgroundColor: "rgba(255, 255, 255, 0.2)", width: 80, height: 80, borderRadius: 100, overflow: 'hidden',
                        display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent:"space-around", padding : 10,
                    }}> 
                            <FontAwesome5Icon name="arrow-left" size={20} color="white" />
                        </BlurView>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("send to")}>
                    <BlurView style={{
                        bottom: 50, backgroundColor: "rgba(255, 255, 255, 0.2)", width: 80, height: 80, borderRadius: 100, overflow: 'hidden',
                        display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent:"space-around", padding : 10,
                    }}> 
                            <FontAwesome5Icon name="download" size={20} color="white" />
                        </BlurView>
                        </TouchableOpacity>
                    </View>
                    <View style = {{height : "20%"}}></View>
                    <View style = {{marginLeft : 20, marginRight : 20, marginBottom : 20, display : 'flex', flexDirection : 'row', width : '100%', alignItems : "flex-end"}}>
                        <View style = {{width : '70%'}}>
                        <Text style = {{color : 'white', fontWeight : 'bold', fontSize : 40}}>{currentData.Title}</Text>
                        <Text style = {{color : 'white', fontSize : 15}}>made by <Text style={{fontWeight : 'bold'}}>author</Text></Text>
                        </View>
                        <View style = {{width : 70, height : 30, backgroundColor : "white", borderRadius : 60, display : 'flex', alignItems : "center", flexDirection : "row",
                        padding : 2, justifyContent : 'space-around'
                    }}>
                        <FontAwesome5 name="star" size={15} color="#C9D8E2" solid />
                        <Text style = {{fontSize : 20, fontWeight : "bold"}}>{currentData.avgNote / 2}</Text></View>
                </View>
                    </View>

                <View style = {{height : "50%", backgroundColor : '#f5f6f9', borderTopLeftRadius : 30, borderTopRightRadius : 30, display : "flex", justifyContent : "space-between", flexDirection : "column"}}>

                        <View>
                        <View style = {{marginLeft : 20, marginRight : 20, marginTop : 20, display : 'flex', flexDirection : 'row', justifyContent : 'space-between'}}>

                            <View>
                                <Text style = {{fontWeight : 'bold', marginBottom : 5}}>Friend Attented</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, marginRight: -20 }} />
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, marginRight: -20 }} />
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, marginRight: -20 }} />
                                    <View style={{ width: 50, height: 50, borderRadius: 100, marginRight: -20, backgroundColor : 'white',
                                    display : 'flex', justifyContent : 'center', alignItems : 'center'
                                     }}><Text style = {{fontWeight : "bold"}}>+20</Text></View>
                                </View>
                            </View>
                            <View>
                                <Text style = {{fontWeight : 'bold', marginBottom : 5}}>Price</Text>
                                <View style = {{width : "auto", height : 50, backgroundColor : "#C9D8E2", display : "flex", flexDirection : 'row', justifyContent : "center", alignItems : "center", padding : 5, borderRadius : 10}}>
                                    <Text style = {{fontWeight : "bold", color : "blue"}}>{currentData.price} COIN / HOUR</Text>
                                </View>
                            </View>
                        </View>
                        <View style = {{marginLeft : 20, marginRight : 20, marginTop : 20}}>
                            <Text style = {{fontWeight : "bold", fontSize : 15}}>Description</Text>
                            <Text style = {{color : "#c8c8c9"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>
                        </View>
                        <View style = {{marginLeft : 20, marginRight : 20, marginTop : 20, display : "flex", flexDirection : 'row', alignItems : "flex-start"}}>
                                <FontAwesome5 name="user" size={20} color="black" solid />
                                <Text style = {{marginLeft : 5, marginRight : 5, fontWeight : "bold"}}>{currentData.status == true ? "Private" : "Public"}</Text>
                                <FontAwesome5 name="compass" size={20} color="black" solid />
                                <Text style = {{marginLeft : 5, marginRight : 5, fontWeight : "bold"}}>Rabat, Morroco</Text>
                        </View>

                        </View>
                            <View style = {{marginLeft : 20, marginRight : 20, marginTop : 20, marginBottom : 30, display : "flex", flexDirection : 'row', alignItems : "flex-start", justifyContent : "space-between"}}>
                               
                               <TouchableOpacity style = {{width : 60, height : 60, backgroundColor : "white", display : "flex", justifyContent : "center", alignItems : "center", borderRadius : 20}}>
                                     <FontAwesome5 name="star" size={20} color="black" solid />
                               </TouchableOpacity>

                               <TouchableOpacity style = {{width : 60, height : 60, backgroundColor : "white", display : "flex", justifyContent : "center", alignItems : "center", borderRadius : 20}}>
                                     <FontAwesome5 name="star" size={20} color="black" solid />
                               </TouchableOpacity>

                               <TouchableOpacity style = {{backgroundColor : "#C9D8E2", height : 60, width : 220 , display : "flex", justifyContent : "center", alignItems : "center", padding : 10, borderRadius : 20}}>
                                    
                                    <Text style = {{fontWeight : "bold", fontSize : 25}}>Shedule Now</Text>

                               </TouchableOpacity>

                            </View>

                        </View>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
    TopView: {
        marginTop : 130,
        marginLeft : 20,
        marginRight : 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },   
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});

export default CoursePage;