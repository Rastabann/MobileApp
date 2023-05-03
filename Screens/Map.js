import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default function App({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 50.4532,
    longitude: 3.9545,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleMarkerPress = (markerData) => {
    setModalVisible(true);
    setModalData(markerData);
  };

  const handleContactPress = () => {
    // handle contact action
  };

  const handleOrderPress = () => {
    // handle order action
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChange={newRegion => setRegion(newRegion)}
        onRegionChangeComplete={newRegion => setRegion(newRegion)}
      >

      </MapView>

</View>
);
}