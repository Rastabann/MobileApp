import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Profile</Text>
      <Text style={styles.infoText}>Name: John Doe</Text>
      <Text style={styles.infoText}>Email: johndoe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default ProfilePage;