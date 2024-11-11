import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface StarterButtonProps {
  title: string;
  type: number;
  action: () => void;
}

export const StarterButton: React.FC<StarterButtonProps> = ({ title, type, action }) => {
  const params = [
    {
      backgroundColor: "#C9D8E2",
      color: "white",
    },
    {
      backgroundColor: "white",
      color: "#C9D8E2",
    }
  ];

  return (
    <View style={[styles.button, { backgroundColor: params[type].backgroundColor }]}>
      <TouchableOpacity style = {{width : "50%", alignItems : "center", justifyContent : "center" , padding : 10, backgroundColor : "white", height : "100%", borderTopLeftRadius : 18, borderBottomLeftRadius : 18}} onPress={() => {alert("not coded yet")}}>
        <Text style={[styles.text, { color: "#C9D8E2" }]}>{"I'm a Producer"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{width : "50%", alignItems : "center", justifyContent : "center", padding : 10, height : "100%"}} onPress={action}>
        <Text style={[styles.text, { color: "white" }]}>{title}</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width - 30,
    height: 89,
    borderRadius: 18,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    flexDirection: 'row',
  },
  bar: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: 'black',
    left: '50%',
    transform: [{ translateX: -1 }],
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});