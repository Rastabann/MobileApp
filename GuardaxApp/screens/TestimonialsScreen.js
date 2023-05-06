import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import firebase from "react-native-firebase";

const TestimonialsScreen = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const testimonialsRef = firebase.database().ref("testimonials");
    testimonialsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.values(data) : [];
      setTestimonials(items);
    });

    return () => testimonialsRef.off();
  }, []);

  const handleSubmit = () => {
    if (name && title && text) {
      const newTestimonial = { name, title, text };
      firebase.database().ref("testimonials").push(newTestimonial);
      setName("");
      setTitle("");
      setText("");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.testimonial}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Your testimonial"
          value={text}
          onChangeText={setText}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <FlatList
        data={testimonials}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  testimonial: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    fontStyle: "italic",
    color: "gray",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default TestimonialsScreen;
