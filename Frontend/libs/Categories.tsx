import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Card from './Card'; // Adjust the import path as necessary
import GlobalText from './GlobalText';

const initialCategories = [
    {
        title: 'Popular Courses',
        items: [
            { id: 1, content: 'Item 1' },
            { id: 2, content: 'Item 2' },
            { id: 3, content: 'Item 3' },
        ],
    },
    {
        title: 'New Courses',
        items: [
            { id: 4, content: 'Item 4' },
            { id: 5, content: 'Item 5' },
            { id: 6, content: 'Item 6' },
        ],
    },
    {
        title: 'Courses for you',
        items: [
            { id: 4, content: 'Item 4' },
            { id: 5, content: 'Item 5' },
            { id: 6, content: 'Item 6' },
        ],
    },
];

const Categories: React.FC = () => {
    const [categories] = useState(initialCategories);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ item: { title: string } }> }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentCategory(viewableItems[0].item.title);
        }
    });

    const handleSeeAll = (title: string) => {
        setExpandedCategory(title === expandedCategory ? null : title);
    };

    return (
        <View style={styles.container}>
            {/* <Text>Current Category: {currentCategory}</Text> */}
            <FlatList
                data={categories}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={[
                        styles.categoryContainer,
                        expandedCategory === item.title && styles.expandedCategoryContainer,
                        currentCategory === item.title && styles.selectedCategoryContainer
                    ]}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>{item.title}</Text>
                            <Button color={"#154551"} title="See all" onPress={() => handleSeeAll(item.title)} />
                        </View>
                        {expandedCategory === item.title ? (
                            <FlatList
                                key={item.title}
                                data={item.items}
                                numColumns={2}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <Card key={item.id} title={item.id.toString()} content={item.content} />
                                )}
                            />
                        ) : (
                            <FlatList
                                data={item.items}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <Card key={item.id} title={item.id.toString()} content={item.content} />
                                )}
                            />
                        )}
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    categoryContainer: {
        marginBottom: 20,
        transform: [{ scale: 0.9 }],
    },
    expandedCategoryContainer: {
        transform: [{ scale: 1 }],
    },
    selectedCategoryContainer: {
        transform: [{ scale: 1 }],
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryTitle: {
        color : "#154551",
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Categories;
