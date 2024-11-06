import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Friends from '../../libs/Friends';

const ProfilePage: React.FC = () => {
    return (
        <View style={styles.profileContainer}>
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
                    <Text style={styles.purchaseButtonText}>Purchase</Text>
                </TouchableOpacity>
            </View>
            <Friends></Friends>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginTop: 100,
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
        backgroundColor: '#C9D8E2',
        padding: 15,
        borderRadius: 30,
    },
    purchaseButtonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default ProfilePage;
