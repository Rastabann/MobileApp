import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import io from "socket.io-client";

const socket = io("https://your-server-url.com:3000", { autoConnect: false });

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: 50.454678,
    longitude: 3.952847,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    socket.connect();

    socket.on("newMarker", (marker) => {
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addMarker = () => {
    const newMarker = {
      coordinate: userLocation,
      key: Date.now(),
    };
    setMarkers([...markers, newMarker]);
    socket.emit("addMarker", newMarker);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        region={userLocation}
        onRegionChangeComplete={(region) => setUserLocation(region)}
      >
        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={addMarker}>
        <Text style={styles.buttonText}>Add marker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default App;
