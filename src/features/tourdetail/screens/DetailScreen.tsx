import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailScreen = () => {
  const route = useRoute();

  const { item } = route.params as any;
  console.log('item details page', item);
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>
      <Text></Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default DetailScreen;
