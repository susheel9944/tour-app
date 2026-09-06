import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleExplore = () => {
    navigation.navigate('MainTabs' as never);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../asset/splash.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.centerContent}>
        <Text style={styles.logo}>ASPEN</Text>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Plan your</Text>
          <Text style={styles.text}>Luxurious Vacation</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleExplore}>
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },

  bottomContent: {
    padding: 30,
  },

  textContainer: {
    marginBottom: 20,
  },

  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
