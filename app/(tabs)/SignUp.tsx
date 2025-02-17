import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { auth } from '../../src/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const goToMatch = () => {
    navigation.navigate('Match');
  };

  const goToLogin = () => {
    navigation.navigate('Login');
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

      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: name,
        });
        goToMatch();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.loginTitle}>S'inscrire</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#fff"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <AntDesign name="login" size={20} color="white" />
          <Text style={[styles.loginButtonText, { marginLeft: 10 }]}>
            {loading ? 'Chargement...' : "S'inscrire"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.signupText}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '80%',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
