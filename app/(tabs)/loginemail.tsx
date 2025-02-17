import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const goToMatch = () => {
    navigation.navigate('Match');  
  };

  const goToForgotPassword = () => {
    navigation.navigate('ResetPassword');  
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.loginTitle}>Se connecter</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#fff"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={goToMatch}>
          <AntDesign name="login" size={20} color="white" />
          <Text style={[styles.loginButtonText, { marginLeft: 10 }]}>Se connecter</Text>
        </TouchableOpacity>

        {/* Bouton "Mot de passe oublié" */}
        <TouchableOpacity onPress={goToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
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
  forgotPasswordText: {
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
