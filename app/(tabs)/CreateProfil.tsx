import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);

const EditProfile = () => {
  const [userName, setUserName] = useState('');  // State for the last name (Nom)
  const [userFirstName, setUserFirstName] = useState('');  // State for the first name (Prénom)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const navigation = useNavigation();

  // Function to pick the profile image
  const pickProfileImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) setUserProfileImage(result.assets[0].uri);
  };

  // Function to handle the date selection
  const handleDatePress = (day: any) => {
    setSelectedDate(new Date(day.dateString));
    setShowCalendar(false);
  };

  // Save profile handler
  const handleSaveProfile = () => {
    console.log(`Nom: ${userName}`);
    console.log(`Prénom: ${userFirstName}`);
    console.log(`Date de naissance : ${selectedDate.toLocaleDateString('fr-FR')}`);
    navigation.navigate('Match');  // Navigate after saving profile
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    setShowMonthPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setShowYearPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.containerProfile}>
      <Text style={styles.pageTitle}>Edit Profile</Text>
      
      {/* Profile Image Section */}
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

      {/* Nom (Last Name) */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>NOM</Text>
        <TextInput 
          style={styles.inputField} 
          value={userName} 
          onChangeText={setUserName}  // Update state when text changes
          placeholder="Votre nom"
        />
      </View>

      {/* Prénom (First Name) */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PRÉNOM</Text>
        <TextInput 
          style={styles.inputField} 
          value={userFirstName} 
          onChangeText={setUserFirstName}  // Update state when text changes
          placeholder="Votre prénom"
        />
      </View>

      {/* Date de Naissance Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>DATE DE NAISSANCE</Text>
        
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} style={styles.dateInput}>
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('fr-FR')}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
          <View>
            {/* Month and Year Selectors */}
            <View style={styles.pickerRow}>
              <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.pickerButton}>
                <Text style={styles.pickerText}>{months[selectedDate.getMonth()]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowYearPicker(true)} style={styles.pickerButton}>
                <Text style={styles.pickerText}>{selectedDate.getFullYear()}</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar */}
            <Calendar
              onDayPress={handleDatePress}
              current={selectedDate.toISOString().split('T')[0]}
              markedDates={{
                [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: 'black' },
              }}
              theme={{
                todayTextColor: 'red',
                selectedDayBackgroundColor: 'black',
                arrowColor: 'black',
              }}
            />
          </View>
        )}

        {/* Month Picker Modal */}
        <Modal visible={showMonthPicker} transparent>
          <View style={styles.modalContainer}>
            <FlatList
              data={months}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleMonthSelect(index)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        {/* Year Picker Modal */}
        <Modal visible={showYearPicker} transparent>
          <View style={styles.modalContainer}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleYearSelect(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerProfile: { flexGrow: 1, backgroundColor: 'white', padding: 20, paddingTop: 80 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 125 },
  profilePlaceholder: { width: 150, height: 150, borderRadius: 125, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  inputField: { height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingLeft: 10 },
  dateInput: { height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9F9' },
  dateText: { fontSize: 16, color: 'black' },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  pickerButton: { padding: 10, backgroundColor: '#E0E0E0', borderRadius: 10 },
  pickerText: { fontSize: 16, color: 'black' },
  modalContainer: { backgroundColor: 'white', margin: 50, padding: 20, borderRadius: 10 },
  modalItem: { padding: 15, alignItems: 'center' },
  modalText: { fontSize: 16 },
  saveButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default EditProfile;
