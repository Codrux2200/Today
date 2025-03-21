import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const navigation = useNavigation();
  return (
    <View style = {styles.container}>
    <ScrollView style={[{ marginTop : 30}]}
    showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.avatar} />
        <Text style={styles.name}>Layla Al-Farsi</Text>
        <Text style={styles.email}>layla-al-farsi@gmail.com</Text>
      </View>

      {/* Credits */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Credits</Text>
        <View style={styles.credits}>
          <Text style={styles.creditText}>6</Text>
          <Ionicons name="cloud-outline" size={20} color="blue" />
        </View>
      </View>

      {/* Friends */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Friends</Text>
        <View style={styles.friends}>
          {[1, 2, 3].map((_, i) => (
            <Image key={i} source={{ uri: "https://i.pravatar.cc/40?img=" + (i + 3) }} style={styles.friendAvatar} />
          ))}
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={async () => {await AsyncStorage.clear(); navigation.navigate("Home" as never) }}>
            <View style={styles.menuLeft}>
              <item.icon size={20} color="gray" />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="gray" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </View>
  );
};

const menuItems = [
  { label: "Account", icon: Ionicons, name: "person-outline" },
  { label: "Security and privacy", icon: Ionicons, name: "shield-checkmark-outline" },
  { label: "Subscription", icon: MaterialIcons, name: "payment" },
  { label: "Notifications", icon: Ionicons, name: "notifications-outline" },
  { label: "Language", icon: FontAwesome, name: "globe" },
  { label: "Help & Support", icon: Ionicons, name: "help-circle-outline" },
  { label: "Privacy policy", icon: Ionicons, name: "lock-closed-outline" },
  { label: "Legals", icon: MaterialIcons, name: "article" },
  { label: "About us", icon: Ionicons, name: "information-circle-outline" },
  { label: "Rate us", icon: Ionicons, name: "star-outline" },
  { label: "Sign out", icon: Ionicons, name: "log-out-outline" },
].map(item => ({
  ...item,
  icon: (props: any) => <item.icon name={item.name} {...props} />,
}));

const styles = StyleSheet.create({
  container: {flex : 1, backgroundColor: "#fff", padding: 20, },
  header: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  email: { color: "gray", marginBottom: 16 },
  card: { backgroundColor: "#f7f7f7", padding: 15, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  credits: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  creditText: { fontSize: 18, fontWeight: "bold", color: "blue" },
  friends: { flexDirection: "row", gap: -10 },
  friendAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
  menu: { marginTop: 20 },
  menuItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, alignItems: "center" },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  menuText: { fontSize: 16, color: "#333" },
});

export default ProfileScreen;
