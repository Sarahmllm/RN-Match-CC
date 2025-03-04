import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../src/firebaseConfig';

import Login from './loginHome';  
import LoginEmail from './loginEmail';   
import ForgotPassword from './ForgotPassword';  
import SignUp from './SignUp';  
import Match from './matchSwipe';  
import CreateProfil from './CreateProfil';  

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MatchTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Match" 
        component={Match} 
        options={{ headerShown: false, tabBarLabel: "Match" }} 
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Match" : "Login"}>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ 
            title: "Retour",
            headerShown: false,
          }}   
        />
        <Stack.Screen 
          name="LoginEmail" 
          component={LoginEmail} 
          options={{
            headerTransparent: true,  
            headerTitle: "",          
            headerTintColor: "#fff",
          }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{ headerShown: true }}  
        />
        <Stack.Screen 
          name="CreateProfil" 
          component={CreateProfil} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Match" 
          component={MatchTabNavigator}  
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{
            title: "",
            headerTransparent: true,
            headerTintColor: "#fff",
            headerBackTitle: "Retour",
            headerBackTitleStyle: { marginRight: 25, fontSize: 16 }, 
          }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
