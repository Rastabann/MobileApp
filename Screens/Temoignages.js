import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TemoignagesPage = () => {
  const [testimonials, setTestimonials] = useState([
    { text: 'Je me suis fait agresser la nuit dernière en rentrant chez moi. C\'était terrifiant. Cependant, Guardaxia m\'a permis de contacter mon petit ami ainsi que les autorités nécessaires pour me sortir de cette situation !', author: 'Marie' },
    { text: 'J\'ai été victime de harcèlement sexuel dans la rue des capucins. C\'est inacceptable ! Heureusement que Guardaxia était là pour garder un oeil sur moi.', author: 'Jean' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Témoignages de victimes d'agression</Text>
      <ScrollView style={styles.scrollContainer}>
        {testimonials.map((testimonial, index) => (
          <TouchableOpacity key={index} style={styles.testimonialContainer}>
            <Text style={styles.testimonialText}>{testimonial.text}</Text>
            <Text style={styles.testimonialAuthor}>- {testimonial.author}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollContainer: {
    width: '100%',
  },
  testimonialContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  testimonialText: {
    fontSize: 16,
    marginBottom: 5,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default TemoignagesPage;