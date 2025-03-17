import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import SubscriptionTest from './subscriptionPlan';
import { db } from '../../src/firebaseConfig';

const { width, height } = Dimensions.get('window');

interface Profile {
  prenom: string;
  birthDate: string;
  profileImage: string;
  age: number;
  photoURL: string;
}

const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate.split('/').reverse().join('-'));
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const MatchScreen = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const profilesData: Profile[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            age: calculateAge(data.birthDate),
            photoURL: data.profileImage.replace('file://', ''),
          } as Profile;
        });
        setProfiles(profilesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des profils:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const currentProfile = profiles[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Match</Text>
        <Ionicons name="star" size={30} color="gold" style={styles.starIcon} />
        </View>
      {currentProfile ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: currentProfile.photoURL }} style={styles.profileImage} />
            <View style={styles.overlay}>
              <Text style={styles.profileText}>{currentProfile.prenom}, {currentProfile.age}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleNextProfile}>
              <Ionicons name="close-circle" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleNextProfile}>
              <Ionicons name="checkmark-circle" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.noProfileText}>Aucun profil disponible</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  navbar: {
    width:'100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  navTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  starIcon: {
    marginRight: 10,
  },
  imageContainer: {
    position: 'relative',
    marginTop: 50,
  },
  profileImage: {
    width: width,
    height: height * 0.7,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    width: width - 40,
    paddingHorizontal: 20,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    elevation: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  noProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchScreen;
