import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MatchScreen = () => {
  const [matchAccepted, setMatchAccepted] = useState<boolean | null>(null);

  const handleAccept = () => {
    setMatchAccepted(true);
    console.log('Match accepté');
  };

  const handleReject = () => {
    setMatchAccepted(false);
    console.log('Match rejeté');
  };

  return (
    <View style={styles.container}>
      {/* En attendant */}
      <Image
        source={{ uri: '' }} 
        style={styles.profileImage}
      />
      
      {/* Les boutons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
          <Ionicons name="close-circle" size={60} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
          <Ionicons name="checkmark-circle" size={60} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Afficher le résultat */}
      {matchAccepted !== null && (
        <Text style={styles.resultText}>
          Match {matchAccepted ? 'accepté' : 'rejeté'}
        </Text>
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
  profileImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
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
  resultText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MatchScreen;
