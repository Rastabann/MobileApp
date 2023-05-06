import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import firebase from "react-native-firebase";

const MapScreen = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markersRef = firebase.database().ref("markers");
    markersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.values(data) : [];
      setMarkers(items);
    });

    return () => markersRef.off();
  }, []);

  const addMarker = (e) => {
    const newMarker = {
      coordinate: e.nativeEvent.coordinate,
    };
    firebase.database().ref("markers").push(newMarker);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={addMarker}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <Button title="Add Marker" onPress={addMarker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
