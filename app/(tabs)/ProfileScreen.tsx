import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../../src/firebaseConfig';

const { width, height } = Dimensions.get('window');

const ProfilePage = () => {
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
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
  }, [user]);

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

  const handleInviteFriends = () => {
    Alert.alert('Inviter des amis', 'Fonction d\'invitation à implémenter');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la déconnexion');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userRef = doc(db, 'users', user!.email!);
      await deleteDoc(userRef);
      await user?.delete();
      await handleLogout();
      Alert.alert('Compte supprimé', 'Votre compte a été supprimé avec succès', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la suppression du compte');
    }
  };

  if (!isProfileLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.profileRow}>
        <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageContainer}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.placeholderText}>Pas d'image</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>{userFirstName}</Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Icon name="email" size={24} color="white" style={styles.icon} />
          <Text style={styles.infoText}>{userEmail}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => console.log('Naviguer vers page d\'édition')}>
        <Text style={styles.editButtonText}>Éditer mon profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleInviteFriends}>
        <Icon name="group-add" size={24} color="#ff6f61" style={styles.actionIcon} />
        <Text style={styles.actionText}>Invitez des amis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Naviguer vers page des paramètres')}>
        <Icon name="settings" size={24} color="#ff6f61" style={styles.actionIcon} />
        <Text style={styles.actionText}>Paramètres</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="power-settings-new" size={24} color="#7F8C8D" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Icon name="delete" size={24} color="#95A5A6" style={styles.deleteIcon} />
        <Text style={styles.deleteText}>Supprimer le compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#101010', padding: 20, paddingBottom: 20 },
  spacer: { height: height * 0.1 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'flex-start', width: width * 0.9 },
  profileImageContainer: { marginRight: 15 },
  profileImage: { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125 },
  profilePlaceholder: { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125, backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: 'white', fontSize: 14 },
  userName: { fontSize: width * 0.05, fontWeight: 'bold', color: 'white' },
  infoSection: { alignSelf: 'stretch', marginBottom: 30 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  infoText: { fontSize: width * 0.045, color: 'white' },
  editButton: { backgroundColor: '#181818', padding: 15, borderRadius: 10, alignItems: 'center' },
  editButtonText: { color: 'white', fontSize: width * 0.045, fontWeight: 'bold' },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 15 },
  actionIcon: { marginRight: 10 },
  actionText: { fontSize: width * 0.045, color: 'white', fontWeight: 'bold' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 15 },
  logoutIcon: { marginRight: 10 },
  logoutText: { fontSize: width * 0.045, color: '#7F8C8D', fontWeight: 'bold' },
  deleteAccountButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 15 },
  deleteIcon: { marginRight: 10 },
  deleteText: { fontSize: width * 0.045, color: '#95A5A6', fontWeight: 'bold' },
});


export default ProfilePage;
