import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [error, setError] = useState('');

  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets) {  
      setProfileImage(result.assets[0].uri); 
    }
  };

  const handleSubmit = async () => {
    if (!name || !age || !profileImage) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const storageRef = ref(getStorage(), `profile_pictures/${name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload failed', error);
          Alert.alert('Erreur', 'L\'upload de la photo a échoué.');
        },
        async () => {
          // Once the upload is complete, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const userRef = doc(getFirestore(), 'users', name);
          await setDoc(userRef, {
            name,
            age,
            profilePicture: downloadURL,
          });

          Alert.alert('Succès', 'Profil créé avec succès');
        }
      );
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création du profil.');
    }
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Créer Profil</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Âge"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImage}
        >
          <AntDesign name="camera" size={20} color="white" />
          <Text style={styles.buttonText}>Choisir une photo</Text>
        </TouchableOpacity>

        {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <AntDesign name="checkcircle" size={20} color="white" />
          <Text style={styles.buttonText}>Créer Profil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 16,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '80%',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateProfile;
