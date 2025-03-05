import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const pickProfileImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) setUserProfileImage(result.assets[0].uri as string | null);
  };

  const handleSaveProfile = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.email!);
      await setDoc(userRef, {
        nom: userName,
        prenom: userFirstName,
        profileImage: userProfileImage,
        email: user.email,
      });
      navigation.navigate('Match' as never);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerProfile}>
      <Text style={styles.pageTitle}>Edit Profile</Text>

      {/* Affichage de l'email de l'utilisateur connecté */}
      {user && (
        <Text style={styles.emailText}>Email: {user.email}</Text>
      )}

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageContainer}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <AntDesign name="user" size={80} color="gray" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profilePhotoLabel}>PROFILE PHOTO</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>NOM</Text>
        <TextInput 
          style={styles.inputField} 
          value={userName} 
          onChangeText={setUserName} 
          placeholder="Votre nom"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PRÉNOM</Text>
        <TextInput 
          style={styles.inputField} 
          value={userFirstName} 
          onChangeText={setUserFirstName} 
          placeholder="Votre prénom"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerProfile: { flexGrow: 1, backgroundColor: 'white', padding: 20, paddingTop: 80 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  emailText: { fontSize: 16, color: 'black', marginBottom: 10 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImageContainer: { justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: 150, height: 150, borderRadius: 125 },
  profilePlaceholder: { width: 150, height: 150, borderRadius: 125, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  profilePhotoLabel: { fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 10 },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  inputField: { height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingLeft: 10 },
  saveButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default EditProfile;
