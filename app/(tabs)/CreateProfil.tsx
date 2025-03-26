import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const navigation = useNavigation<any>();
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const checkUserProfile = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.email!);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          navigation.navigate('Match');
        } else {
          setIsProfileLoaded(true);
        }
      }
    };
    checkUserProfile();
  }, [user, db, navigation]);

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
    if (!userFirstName || !birthDate || !userProfileImage || !gender) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }
    if (user) {
      const userRef = doc(db, 'users', user.email!);
      await setDoc(userRef, {
        prenom: userFirstName,
        birthDate: birthDate,
        profileImage: userProfileImage,
        email: user.email,
        gender: gender,
      });
      navigation.navigate('Match');
    }
  };

  const handleDateChange = (text: string) => {
    const formattedText = text
      .replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{2})/, '$1/$2')
      .replace(/(\d{2})(\d{4})/, '$1/$2');
    setBirthDate(formattedText);
  };

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
  };

  if (!isProfileLoaded) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerProfile}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.pageTitle}>Créez votre profil</Text>
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
          <Text style={styles.inputLabel}>PRÉNOM</Text>
          <TextInput 
            style={styles.inputField} 
            value={userFirstName} 
            onChangeText={setUserFirstName} 
            placeholder="Votre prénom"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>DATE DE NAISSANCE</Text>
          <TextInput 
            style={styles.inputField} 
            value={birthDate} 
            onChangeText={handleDateChange} 
            placeholder="jj/mm/aaaa"
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>SEXE</Text>
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Homme' && styles.selectedButton]}
              onPress={() => handleGenderSelection('Homme')}
            >
              <Text style={[styles.genderButtonText, gender === 'Homme' && styles.selectedText]}>Homme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Femme' && styles.selectedButton]}
              onPress={() => handleGenderSelection('Femme')}
            >
              <Text style={[styles.genderButtonText, gender === 'Femme' && styles.selectedText]}>Femme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerProfile: { flex: 1, backgroundColor: 'white', paddingTop: 80 },
  scrollViewContainer: { flexGrow: 1, padding: 20 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  emailText: { fontSize: 16, color: 'black', marginBottom: 10 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImageContainer: { justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: 150, height: 150, borderRadius: 125 },
  profilePlaceholder: { width: 150, height: 150, borderRadius: 125, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  profilePhotoLabel: { fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 10 },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  inputField: { height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingLeft: 10, color: 'black' },
  saveButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  genderButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  genderButton: { flex: 1, padding: 10, backgroundColor: '#F0F0F0', borderRadius: 5, alignItems: 'center', margin: 5 },
  selectedButton: { backgroundColor: '#4CAF50' },
  genderButtonText: { color: '#000', fontSize: 16 },
  selectedText: { color: '#FFF' },
});

export default EditProfile;
