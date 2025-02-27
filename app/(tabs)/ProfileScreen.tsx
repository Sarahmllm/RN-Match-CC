import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const { userId } = useRoute().params;  // ID de l'utilisateur passé en paramètre

  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);

        if (data.photoURL) {
          const photoRef = ref(storage, `users/${userId}/profile.jpg`);
          const url = await getDownloadURL(photoRef);
          setPhotoURL(url);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoURL || 'defaultProfilePicURL' }} style={styles.photo} />
      <Text style={styles.text}>Prénom : {userData.firstName}</Text>
      <Text style={styles.text}>Nom : {userData.lastName}</Text>
      <Text style={styles.text}>Email : {userData.email}</Text>
      <Text style={styles.text}>Date de naissance : {userData.birthdate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  photo: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  text: { fontSize: 18, color: '#333', marginBottom: 10 },
});
