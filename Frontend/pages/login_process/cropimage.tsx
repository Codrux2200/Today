import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomText } from '../../utils/text/text';

// Définir les pages
const PAGES = {
  SELECT_IMAGE: 1,
  PREVIEW_IMAGE: 2,
  VALIDATE: 3,
};

const CircularCropPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.SELECT_IMAGE);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Demander les permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la bibliothèque pour sélectionner une photo.');
    }

    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à l\'appareil photo pour prendre une photo.');
    }
  };

  // Choisir une photo depuis la bibliothèque
  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setCurrentPage(PAGES.PREVIEW_IMAGE); // Passer à la page de prévisualisation
    }
  };

  // Prendre une photo avec l'appareil
  const takePhotoWithCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setCurrentPage(PAGES.PREVIEW_IMAGE); // Passer à la page de prévisualisation
    }
  };

  // Valider l'image
  const validateImage = () => {
    setCurrentPage(PAGES.VALIDATE); // Passer à la page de validation
  };

  // Revenir à la sélection d'image
  const goBackToSelection = () => {
    setImageUri(null);
    setCurrentPage(PAGES.SELECT_IMAGE);
  };





  const BottomModal: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect((

    ) => {
        requestPermissions();

    }, []);
    return (
      <View style={styles.pageContainer}>
        {/* Bouton pour ouvrir le modal */}
        <View style = {{display : 'flex', alignItems : "center"}}>
            <CustomText style={styles.title}>Choose your Profile Picture</CustomText>
            <CustomText>Choose a picture that represent you !!</CustomText>
            </View>
            <Image source={require("../../assets/avatar.png")}></Image>
            <View style = {{width : "100%"}}>
            <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(true)}}>
              <CustomText style={styles.buttonText} >continuer</CustomText>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
              <Text style={styles.buttonText}>Prendre une photo</Text>
            </TouchableOpacity> */}
            </View>
        {/* Modal */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>  
              {/* Option 1 : Prendre une photo */}
              <TouchableOpacity style={styles.modalOption} onPress={pickImageFromLibrary}>
                <Text style={styles.modalOptionText}>Choose from Gallery</Text>
              </TouchableOpacity>
  
              {/* Option 2 : Choisir depuis la galerie */}
              <TouchableOpacity style={styles.modalOption}  onPress={takePhotoWithCamera}>
                <Text style={styles.modalOptionText}>Take picture</Text>
              </TouchableOpacity>
  
              {/* Bouton Annuler */}
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  // Afficher la page en fonction de l'état
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.SELECT_IMAGE:
        return (
        
          <View style={styles.pageContainer}>
            <BottomModal></BottomModal>
          </View>
        );

      case PAGES.PREVIEW_IMAGE:
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.title}>Aperçu de la photo</Text>
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.roundImage}
                />
              </View>
            )}
            <View style = {{width : "100%", gap : 30}}>
            <TouchableOpacity style={styles.button} onPress={validateImage}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goBackToSelection}>
              <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
            </View>
          </View>
        );

      case PAGES.VALIDATE:
        return (
          <View style={styles.pageContainer}>
           <View style = {{display : 'flex', alignItems : "center"}}>
            <CustomText style={styles.title}>Choose your Profile Picture</CustomText>
            <CustomText>Choose a picture that represent you !!</CustomText>
            </View>
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.roundImage}
                />
              </View>
            )}
            <View style = {{width : "100%"}}>
                
            <TouchableOpacity style={styles.button}>
              <CustomText style={styles.buttonText} >continuer</CustomText>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
              <Text style={styles.buttonText}>Prendre une photo</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageContainer: {
    flex : 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor : 'white',
    display : "flex",
    flexDirection : "column",
    alignContent : "center",
    justifyContent : 'space-around',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  roundImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default CircularCropPage;