import { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { auth } from '../../src/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { Asset } from 'expo-asset';

const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const storage = getStorage();
  const db = getFirestore();

  // Vérification des permissions pour accéder à la galerie
  const checkPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError("Permission d'accès à la galerie refusée.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await checkPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Utilisation de fetch pour convertir l'URI en blob
  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return response.blob();
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      let photoURL = '';
  
      if (photo) {
        const resizedImage = await ImageManipulator.manipulateAsync(
          photo,
          [{ resize: { width: 800 } }],
          { compress: 0.7 }
        );
  
        const blob = await uriToBlob(resizedImage.uri);
        const photoRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);
        const uploadTask = uploadBytesResumable(photoRef, blob);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Progression de l\'upload:', progress);
          },
          (error) => {
            console.error('Erreur lors de l\'upload:', error);
            setError(`Erreur de téléchargement : ${error.message}`);
          },
          async () => {
            photoURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Image uploadée avec succès:', photoURL);
          }
        );
      }
  
      if (currentUser) {
        await updateProfile(currentUser, { displayName: `${firstName} ${lastName}`, photoURL });
        await setDoc(doc(db, 'users', currentUser.uid), {
          firstName,
          lastName,
          email,
          birthdate,
          photoURL,
          createdAt: new Date(),
        });
  
        navigation.navigate('Match');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur inconnue lors de l'inscription : ", error);
        setError(`Une erreur inconnue est survenue : ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.loginTitle}>S'inscrire</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <FontAwesome name="user-circle" size={80} color="#fff" />
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName} />
          <TextInput style={styles.input} placeholder="Date de naissance (JJ/MM/AAAA)" value={birthdate} onChangeText={setBirthdate} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={secureTextEntry} value={password} onChangeText={setPassword} />
          <TextInput style={styles.input} placeholder="Confirmer le mot de passe" secureTextEntry={secureTextEntry} value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup} disabled={loading}>
          <AntDesign name="login" size={20} color="white" />
          <Text style={styles.loginButtonText}>{loading ? 'Chargement...' : "S'inscrire"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  inputContainer: { width: '80%', marginBottom: 20 },
  input: { height: 50, borderColor: '#fff', borderWidth: 1, borderRadius: 15, paddingLeft: 15, color: '#fff', marginBottom: 10 },
  loginButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15 },
  loginButtonText: { marginLeft: 10, fontWeight: 'bold' },
  errorText: { color: 'red', marginBottom: 10 },
  photoContainer: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: 20, backgroundColor: '#ccc' },
  photo: { width: '100%', height: '100%', borderRadius: 50 },
});
