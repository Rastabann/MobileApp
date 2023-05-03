import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Contact from "./Screens/Contact";
import Login from "./Screens/Login";
import Map from './Screens/Map';
import Temoignages from './Screens/Temoignages';
import Profile from './Screens/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <NavigationContainer>
  <Tab.Navigator>
   <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="Map"
      component={Map}
      options={{
        title: 'Map',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="map" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Contact"
      component={Contact}
      options={{
        title: 'Contact ',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Temoignages"
      component={Temoignages}
      options={{
        title: 'Temoignages',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="info" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
</NavigationContainer>
  );
 }



