import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "react-native-firebase";
import auth from "@react-native-firebase/auth";
import firebaseConfig from "./firebaseConfig";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import MapScreen from "./screens/MapScreen.js";
import ContactScreen from "./screens/ContactScreen.js";
import TestimonialsScreen from "./screens/TestimonialsScreen.js";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Load Firebase configuration from Google services file
    firebase
      .app()
      .configure()
      .then(() => {
        console.log("Firebase initialized successfully.");
        // Do other things after Firebase is initialized
      })
      .catch((error) => {
        console.log("Firebase initialization failed: ", error);
      });
  }, []);

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
