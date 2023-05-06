import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Welcome, {user.email}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Please log in or register</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ProfileScreen;
