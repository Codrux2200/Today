import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import GlobalText from './GlobalText';

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
    <View style={styles.container}>
    <TouchableOpacity 
      style={[styles.button, styles.button1]} 
      onPress={() => {alert('Button 1 clicked')}}
    >
      <Text style={[styles.buttonText, {color : '#C9D8E2'}]}>I'm a Producer</Text>
    </TouchableOpacity>

    <View style={styles.spacer} />  {/* Espace entre les boutons */}

    <TouchableOpacity 
      style={[styles.button, styles.button2]} 
      onPress={action}
    >
      <Text style={styles.buttonText}>I'am a consumer</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  gap: 10,  // Espace entre les boutons
  alignItems: 'center',
  justifyContent: 'center',
  width : Dimensions.get('window').width,
  flexDirection: 'row',
},
button: {
  width: '40%',
  height: 60,
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,  // S'il n'y a pas de spacer, on peut donner un marginBottom
},
button1: {
  backgroundColor: 'white',  // Bleu pour le premier bouton
},
button2: {
  backgroundColor: '#C9D8E2',  // Vert pour le second bouton
},
buttonText: {
  color: 'white',
  fontSize: 13,
  fontWeight: 'bold',
},
spacer: {
  height: 20,  // Taille de l'espace entre les boutons
}
});
