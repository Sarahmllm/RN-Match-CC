import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { auth } from '../../src/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      if (!email || !password) {
        setError("L'email et le mot de passe sont requis.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('CreateProfil');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setError("Identifiants invalides. Vérifiez votre email et mot de passe.");
      } else if (error.code === 'auth/user-not-found') {
        setError("Cet email n'est pas enregistré.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Mot de passe incorrect.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Email invalide.");
      } else {
        setError("Une erreur inconnue est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Champ Mot de passe */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mot de passe"
              placeholderTextColor="#fff"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <AntDesign name="login" size={20} color="white" />
          <Text style={[styles.loginButtonText, { marginLeft: 10 }]}>
            {loading ? 'Chargement...' : "Se connecter"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signupText}>Pas encore de compte ? S'inscrire</Text>
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
    fontSize: 26,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
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