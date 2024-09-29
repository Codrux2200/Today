import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import SwipeToStart from '../../libs/SwipetoStart';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
export const Starter = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        { img: require('../../assets/acceuil_1.png') },
        { img: require('../../assets/acceuil_2.png') },
        { img: require('../../assets/acceuil_3.png') },
        { img: require('../../assets/acceuil_4.png') },
    ];

    const handleItemChanged = (index: any) => {
        if (index < 0) {
            setCurrentIndex(0);
        }
        else if (index >= images.length) {
            setCurrentIndex(images.length - 1);
        }
        else {
            setCurrentIndex(index);
        }
    };

    const { width, height } = Dimensions.get('window');
    const [text, settext] = useState(0);
    const textStrings = [
        "Purchase credits to book group or individual classes.",
        "Attend classes and reward yourself by earning credits.",
        "Improve social by share classes and credits with friends.",
        "Already a coach? Sign up to boost your popularity!",
        "Purchase credits to book group or individual classes.",
        "Attend classes and reward yourself by earning credits.",
        "Improve social by share classes and credits with friends.",
        "Already a coach? Sign up to boost your popularity!"
    ];

    return (
        <View style={styles.container}>
            <ImageSlider
                data={images}
                localImg
                activeIndicatorStyle={{ backgroundColor: "orange", width: 80 }}
                onItemChanged={(item) => handleItemChanged(item.img)}
                preview={false}
                indicatorContainerStyle={{ bottom: height - 100, right: 0 }}
                caroselImageStyle={{ resizeMode: 'cover', width: width, height: height }}
                inActiveIndicatorStyle={{ width: 20, height: 5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            />
            <View style={{ position: 'absolute', top: "13%", width: "90%", marginLeft: "10%" }}>
                <Text style={{ color: 'white', fontSize: 34, fontWeight: 'bold' }}>{textStrings[text]}</Text>
                <Text style={{ color: 'white', marginRight: 20, paddingTop: 20 }}>today application</Text>
            </View>
            <BlurView style={{
                position: 'absolute', bottom: 50, backgroundColor: "rgba(255, 255, 255, 0.2)", width: '90%', height: 89, borderRadius: 18, overflow: 'hidden',
                display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"
            }}>
                <SwipeToStart onStart={() => { navigation.navigate("Homeblogin" as never) }}></SwipeToStart>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});