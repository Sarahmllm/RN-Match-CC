import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Match from './matchSwipe';  

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Match">
      <Stack.Screen 
        name="Match" 
        component={MatchTabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
