import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.email!);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfileImage(userData?.profileImage || null);
          setUserFirstName(userData?.prenom || '');
          setUserEmail(user.email || '');
        }
        setIsProfileLoaded(true);
      }
    };
    loadUserProfile();
  }, [user, db]);

  const pickProfileImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      const newImageUri = result.assets[0].uri;
      setUserProfileImage(newImageUri);
      if (user) {
        const userRef = doc(db, 'users', user.email!);
        await setDoc(userRef, {
          profileImage: newImageUri,
        }, { merge: true });
      }
    } else {
      Alert.alert('Erreur', 'L\'image n\'a pas pu être sélectionnée');
    }
  };

  if (!isProfileLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageContainer}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.placeholderText}>Pas d'image</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profilePhotoLabel}>Cliquez pour changer votre photo</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Prénom:</Text>
        <Text style={styles.infoText}>{userFirstName}</Text>

        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{userEmail}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => console.log('Naviguer vers page d\'édition')}>
        <Text style={styles.editButtonText}>Éditer mon profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImageContainer: { justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: 150, height: 150, borderRadius: 125 },
  profilePlaceholder: { width: 150, height: 150, borderRadius: 125, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: 'gray', fontSize: 16 },
  profilePhotoLabel: { fontSize: 14, color: 'black', marginTop: 10 },

  infoSection: { alignSelf: 'stretch', marginBottom: 30 },
  infoLabel: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  infoText: { fontSize: 16, color: 'black', marginBottom: 10 },

  editButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center' },
  editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ProfilePage;
