import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

export default function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handlePasswordReset = () => {
    console.log('Réinitialisation du mot de passe');
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.forgotPasswordTitle}>Mot de passe oublié</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
          <AntDesign name="lock" size={20} color="white" />
          <Text style={[styles.resetButtonText, { marginLeft: 10 }]}>Réinitialiser le mot de passe</Text>
        </TouchableOpacity>

        {/* bouton retour */}
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.goBackText}>Retour à la connexion</Text>
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
  forgotPasswordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: "#fff"
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
  resetButton: {
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
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  goBackText: {
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
