import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from "react-native";
import firebase from "firebase";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const contactsRef = firebase.database().ref(`users/${userId}/contacts`);
    contactsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.values(data) : [];
      setContacts(items);
    });

    return () => contactsRef.off();
  }, []);

  const saveContact = () => {
    const userId = firebase.auth().currentUser.uid;
    const newContact = { name, phoneNumber };
    firebase.database().ref(`users/${userId}/contacts`).push(newContact);
    setName("");
    setPhoneNumber("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text>Name: {item.name}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Save Contact" onPress={saveContact} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  contactItem: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default ContactScreen;
