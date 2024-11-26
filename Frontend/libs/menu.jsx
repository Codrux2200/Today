import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Menu = () => {
  const [selectedItem, setSelectedItem] = React.useState("Yoga");
  const [isExpanded, setIsExpanded] = React.useState(false);

  const items = [
    { name: "Yoga", icon: "praying-hands" },
    { name: "Boxing", icon: "hand-rock" },
    { name: "Basketball", icon: "basketball-ball" },
    { name: "Football", icon: "football-ball" },
    { name: "Tennis", icon: "table-tennis" },
    { name: "Golf", icon: "golf-ball" },
    { name: "Swimming", icon: "swimmer" },
    { name: "Running", icon: "running" },
    { name: "Cycling", icon: "biking" },
    { name: "Gym", icon: "dumbbell" },
  ];

  return (
    <View style={styles.container}>
      {/* Compact Menu */}
      {!isExpanded && (
        <ScrollView
          style={styles.horizontalMenu}
          horizontal
          scrollEnabled = {false}
          showsHorizontalScrollIndicator={false}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedItem(item.name)}
              style={styles.menuItem}
            >
              <FontAwesome5
                name={item.icon}
                size={24}
                color={selectedItem === item.name ? "black" : "gray"}
              />
              <Text
                style={[
                  styles.menuText,
                  selectedItem === item.name && styles.selectedText,
                ]}
              >
                {item.name}
              </Text>
              {selectedItem === item.name && <View style={styles.blackLine} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Expanded Menu */}
      {isExpanded && (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedItem(item.name)}
              style={styles.expandedMenuItem}
            >
              <FontAwesome5
                name={item.icon}
                size={24}
                color={selectedItem === item.name ? "black" : "gray"}
              />
              <Text
                style={[
                  styles.menuText,
                  selectedItem === item.name && styles.selectedText,
                ]}
              >
                {item.name}
              </Text>
              {selectedItem === item.name && <View style={styles.blackLine} />}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.expandedContainer}
        />
      )}

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.toggleButtonText}>
          {isExpanded ? "Collapse" : "Expand"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  horizontalMenu: {
    flexDirection: "row",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  expandedMenuItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    flex: 1,
    maxWidth: "30%",
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  selectedText: {
    color: "black",
  },
  blackLine: {
    marginTop: 5,
    height: 2,
    width: "80%",
    backgroundColor: "black",
  },
  expandedContainer: {
    paddingHorizontal: 5,
  },
  toggleButton: {
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Menu;
