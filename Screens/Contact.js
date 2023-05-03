import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ContactPage = () => {
  const emergencyContacts = [
    { name: 'Police', number: '101' },
    { name: 'Ambulances', number: '112' },
    { name: 'Violences conjugales', number: '0800 30 030' },
  ];
  const personalContacts = [
    { name: 'Maman', number: '+32472345678' },
    { name: 'Papa', number: '+32487654321' },
    { name: 'Meilleur ami', number: '+32464321987' },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts d'urgence</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Autorités compétentes</Text>
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity key={index} style={styles.contactContainer} onPress={() => handleCall(contact.number)}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contacts personnels</Text>
        {personalContacts.map((contact, index) => (
          <TouchableOpacity key={index} style={styles.contactContainer} onPress={() => handleCall(contact.number)}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  contactName: {
    fontSize: 16,
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ContactPage;
