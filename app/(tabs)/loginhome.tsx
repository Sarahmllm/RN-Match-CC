import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

export default function LoginScreen({ navigation }: { navigation: any }) {  
  const bgImage = Asset.fromModule(require('../../assets/images/LoginBackground.png')).uri;

  const goToLoginEmail = () => {
    navigation.navigate('LoginEmail');  
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <AntDesign name="google" size={20} color="white" />
            <Text style={[styles.loginButtonText, { marginLeft: 10 }]}> Se connecter avec Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginAppleButton}>
            <AntDesign name="apple1" size={20} color="white" />
            <Text style={[styles.loginAppleButtonText, { marginLeft: 10 }]}> Se connecter avec Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={goToLoginEmail}>
            <FontAwesome name="envelope" size={20} color="white" />
            <Text style={[styles.loginButtonText, { marginLeft: 10 }]}> Se connecter par Email</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Aides & services</Text>
        </View>
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
  loginButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
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
  loginAppleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '80%',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginAppleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  helpContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  helpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
  }
});
