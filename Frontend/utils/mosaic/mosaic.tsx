import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { CustomText } from '../text/text';

// Définir le type pour les images
interface ImageData {
  id: string;
  uri: string;
  height: number;
}

// Données d'exemple
const images: ImageData[] = [
  { id: '1', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 200 },
  { id: '2', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 350 },
  { id: '3', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 300 },
  { id: '4', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 300 },
  { id: '5', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 250 },
  { id: '6', uri: 'https://img.freepik.com/photos-gratuite/grand-plan-portrait-jeune-homme-africain-chaume_171337-1296.jpg', height: 400 },
];

// Nombre de colonnes
const NUM_COLUMNS = 3;

const MosaicImages: React.FC = () => {
  // Organiser les images en colonnes
  const getColumns = (): ImageData[][] => {
    const columns: ImageData[][] = Array.from({ length: NUM_COLUMNS }, () => []);
    images.forEach((image, index) => {
      columns[index % NUM_COLUMNS].push(image);
    });
    return columns;
  };

  const columns = getColumns();

  return (
    <View style={styles.container}>
      {columns.map((column, columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {column.map(image => (
            <View key={image.id} style = {styles.shadowBox}>
                <Image
                key={image.id}
                source={{ uri: image.uri }}
                style={[styles.image, { height: image.height * 0.8 }]}
                resizeMode="cover"
                />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    position : 'absolute',
    top: -10,
    width: Dimensions.get('window').width + 110,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  shadowBox: {
    overflow : "visible",
    borderRadius: 20,
    shadowColor: '#3F3F3F', // Couleur de l'ombre (noir par défaut)
    shadowOffset: { width: 0, height: 2 }, // Déplacement horizontal et vertical de l'ombre
    shadowOpacity: 0.3, // Transparence de l'ombre (0 à 1)
    shadowRadius: 2, // Rayon de l'ombre (effet de flou)
    elevation: 5, // Ombre pour Android
  },
  image: {
    borderWidth: 4,
    borderColor: 'white',
    width: Dimensions.get('window').width / NUM_COLUMNS + 30, // Largeur d'image ajustée
    marginBottom: 10,
    overflow : "hidden",
    borderRadius: 20,
  },

});

export default MosaicImages;
