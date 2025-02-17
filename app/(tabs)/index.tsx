import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './loginhome';  
import Match from './loginemail';   
import ForgotPassword from './ForgotPassword';  
import SignUp from './SignUp';  

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
          name="Match" 
          component={Match} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
        />
      <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

