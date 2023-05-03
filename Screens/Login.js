import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if(email === "test@gmail.com" && password === "password"){
      console.log("Logged in successfully!");
      setErrorMessage("");
      setIsLoggedIn(true);
    }else{
      setErrorMessage("Incorrect Email or Password");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, 
      // eslint-disable-next-line react-hooks/exhaustive-deps
[isLoggedIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharma'home</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00cc44",
    padding: 25
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#4f83cc",
    padding: 12,
    marginTop:  10,
    width: "100%",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  }
});

export default LoginPage;