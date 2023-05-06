import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "../firebaseConfig";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));
      navigation.navigate("Profile");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
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
  registerLink: {
    color: "#1E90FF",
    textAlign: "center",
  },
});

export default LoginScreen;
