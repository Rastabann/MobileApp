import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import auth from "@react-native-firebase/auth";
import firebaseConfig from "./firebaseConfig";
import ProfileScreen from "./ProfileScreen";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import MapScreen from "./MapScreen";
import ContactScreen from "./ContactScreen";
import TestimonialsScreen from "./TestimonialsScreen";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth().signInAnonymously(); // For anonymous authentication, you can replace it with other authentication methods
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Testimonials">
        <Stack.Screen
          name="Testimonials"
          component={TestimonialsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
