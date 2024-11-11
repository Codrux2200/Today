import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import Friends from '../../libs/Friends';
import { FontAwesome5 } from '@expo/vector-icons';

interface CustomButtonProps {
    title: string;
    icon: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, icon }) => {
    return (
        <TouchableOpacity style={styles.customButton}>
            <View style={styles.iconContainer}>
                <FontAwesome5 name={icon} size={20} color="black" />
            </View>
            <Text style={styles.buttonText}>{title}</Text>
            <FontAwesome5 name="chevron-right" size={20} color="grey" />
        </TouchableOpacity>
    );
};

const ProfilePage: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.profileContainer}>
                <View style={{ marginTop: 100 }}></View>
                <View style = {styles.topView}>
                    <View style = {styles.topViewCirle}>
                    <FontAwesome5 name = {"bell"} size = {20}></FontAwesome5>
                    </View>
                </View>
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                    style={styles.profileImage} 
                />
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>

                <View style={styles.creditContainer}>
                    <View style={styles.creditInfo}>
                        <Text style={styles.creditLabel}>Current Credit</Text>
                        <Text style={styles.creditValue}>100</Text>
                    </View>
                    <TouchableOpacity style={styles.purchaseButton}>
                        <Text style={styles.purchaseButton}>Purchase</Text>
                    </TouchableOpacity>
                </View>
                <Friends />
                <CustomButton title="My Reservations" icon='calendar' />
                <CustomButton title="Settings" icon='hard-drive' />
                <CustomButton title="Favorites" icon='heart' />
                <View style= {{height : 200}}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    topView: {
        display : 'flex',
        justifyContent : "flex-end",
        alignItems : "flex-end",
        flexDirection : 'row',
        gap : 10,
        width : "100%",
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 10,
    },
    topViewCirle: {
        width : 50,
        height : 50,
        marginLeft : 20,
        marginRight : 20,
        borderRadius : 100,
        backgroundColor : "#C9D8E2",
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        backgroundColor: "#f5f6f9",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 16,
        marginTop: 5,
    },
    creditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
    },
    creditInfo: {
        flex: 1,
        alignItems: 'flex-start',
    },
    creditLabel: {
        fontSize: 16,
    },
    creditValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    purchaseButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#C9D8E2',
        fontSize: 16,
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#C9D8E2',
        opacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    arrow: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
