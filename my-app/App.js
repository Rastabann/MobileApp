import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { io } from "socket.io-client";

const socket = io("http://your-vps-ip-or-domain:5500", { autoConnect: false });

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    socket.connect();

    socket.on("connected", (userId) => {
      setCurrentUser(userId);
    });

    socket.on("marker", (marker) => {
      setMarkers((markers) => [...markers, marker]);
    });

    socket.on("removeMarker", (marker) => {
      setMarkers((markers) => markers.filter((m) => m.id !== marker.id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMapPress = (event) => {
    const newMarker = {
      id: `${currentUser}-${Date.now()}`,
      user: currentUser,
      coordinates: event.nativeEvent.coordinate,
      text: "",
      visible: false,
    };

    setMarkers((markers) => [...markers, newMarker]);
    socket.emit("marker", newMarker);
  };

  const handleRemoveMarker = () => {
    if (selectedMarker) {
      setMarkers((markers) =>
        markers.filter((marker) => marker.id !== selectedMarker.id)
      );
      socket.emit("removeMarker", selectedMarker);
      setSelectedMarker(null);
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleTextSubmit = () => {
    if (selectedMarker) {
      const newText = selectedMarker.text;
      setMarkers((markers) =>
        markers.map((m) =>
          m.id === selectedMarker.id ? { ...m, text: newText } : m
        )
      );
      setSelectedMarker(null);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 50.454678,
          longitude: 3.952847,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinates}
            onPress={() => handleMarkerPress(marker)}
          >
            {marker.visible && (
              <View style={styles.markerTextContainer}>
                <Text style={styles.markerText}>{marker.text}</Text>
              </View>
            )}
          </Marker>
        ))}
      </MapView>
      {selectedMarker && (
        <TouchableOpacity style={styles.button} onPress={handleRemoveMarker}>
          <Text style={styles.buttonText}>
            Supprimer le marqueur sélectionné
          </Text>
        </TouchableOpacity>
      )}
      {selectedMarker && (
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={selectedMarker.text}
            onChangeText={(text) =>
              setSelectedMarker({ ...selectedMarker, text })
            }
            onSubmitEditing={handleTextSubmit}
          />
        </View>
      )}
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
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  textInputContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 7)",
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
  },
  markerTextContainer: {
    backgroundColor: "(255, 255, 255, 0.7)",
    borderRadius: 5,
    padding: 5,
    maxWidth: 200,
  },
  markerText: {
    fontSize: 14,
  },
});

export default App;
