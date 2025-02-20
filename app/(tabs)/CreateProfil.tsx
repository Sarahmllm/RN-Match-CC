import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Match from './match';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const navigation = useNavigation();

  const pickProfileImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) setUserProfileImage(result.assets[0].uri);
  };

  const handleSaveProfile = () => {
    navigation.navigate('Match');  
  };

  return (
    <View style={styles.containerProfile}>
      <Text style={styles.pageTitle}>Edit Profile</Text>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickProfileImage} style={styles.imageContainer}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <AntDesign name="user" size={80} color="gray" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profileLabel}>PROFILE PHOTO</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>NOM</Text>
        <TextInput style={styles.inputField} value={userName} onChangeText={setUserName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PRENOM</Text>
        <TextInput style={styles.inputField} value={userFirstName} onChangeText={setUserFirstName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>AGE</Text>
        <TextInput style={[styles.inputField, styles.inputWithBorder]} keyboardType="numeric" value={userAge} onChangeText={setUserAge} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>LOCATION</Text>
        <TextInput style={[styles.inputField, styles.inputWithBorder]} value={userLocation} onChangeText={setUserLocation} />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Sauvegarde</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 80,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 125,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 125,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B0B0B0', 
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  inputWithBorder: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
