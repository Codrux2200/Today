import React, { useState } from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet } from 'react-native';
import GlobalText from './GlobalText';

const friendsData = [
    { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Diana', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'Eve', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 6, name: 'Frank', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
];

const Friends: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const displayedFriends = showAll ? friendsData : friendsData.slice(0, 5);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends</Text>
                <Button title="Show All" onPress={() => setShowAll(!showAll)} />
            </View>
            <FlatList
                data={displayedFriends}
                keyExtractor={item => item.id.toString()}
                horizontal={!showAll}
                key={showAll ? 5 : 1} // Change the key when showAll is true
                numColumns={showAll ? 2 : 1} // Change the number of columns when showAll is true
                renderItem={({ item }) => (
                    <View style={styles.friendContainer}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
                contentContainerStyle={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
    },
    flatList: {
        marginBottom: 10,
    },
    friendContainer: {
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
        flex: 1, // Ensure the items take up equal space
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    name: {
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default Friends;