import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './loginhome';  
import LoginEmail from './loginemail';   
import ForgotPassword from './ForgotPassword';  
import SignUp from './SignUp';  
import Match from './match';  
import CreateProfil from './CreateProfil';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="LoginEmail" 
          component={LoginEmail} 
          options={{ headerShown: false }}  

        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{ headerShown: false }}  
        />
         <Stack.Screen 
          name="CreateProfil" 
          component={CreateProfil} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Match" 
          component={Match} 
          options={{ headerShown: false }}  
        />
      <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

