import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Se connecter</Text>
      
      <View style={styles.loginButtonContainer}>
        {/* Bouton de connexion avec Google */}
        <TouchableOpacity style={styles.loginButton}>
          <AntDesign name="google" size={20} color="black" />
          <Text style={[styles.loginButtonText, { marginLeft: 10 }]}> Se connecter avec Google</Text>
        </TouchableOpacity>
        
        {/* Bouton de connexion avec Apple */}
        <TouchableOpacity style={styles.loginAppleButton}>
          <AntDesign name="apple1" size={20} color="white" />
          <Text style={[styles.loginAppleButtonText, { marginLeft: 10 }]}> Se connecter avec Apple</Text>
        </TouchableOpacity>
        
        {/* Bouton de connexion par Email */}
        <TouchableOpacity style={styles.loginButton}>
          <FontAwesome name="envelope" size={20} color="black" />
          <Text style={[styles.loginButtonText, { marginLeft: 10 }]}> Se connecter par Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loginButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
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
    borderColor: '#000',
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
    color: '#000',
    fontWeight: 'bold',
  },
  loginAppleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
