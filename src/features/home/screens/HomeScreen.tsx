import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

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

        <TouchableOpacity
          style={styles.button}
          onPress={() => (navigation as any).navigate('Explorescreen')}
        >
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Montserrat-BlackItalic',
  },

  bottomContent: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  text: {
    fontFamily: 'Montserrat-BlackItalic',
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },

  button: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
