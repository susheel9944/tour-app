import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Color Layer 1 */}
      <View style={styles.circle1} />

      {/* Color Layer 2 */}
      <View style={styles.circle2} />

      {/* Color Layer 3 */}
      <View style={styles.circle3} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>ASPEN</Text>

        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 60, 1)',
    overflow: 'hidden',
  },

  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 80, 120, 0.6)',
    top: -100,
    left: -80,
  },

  circle2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(80, 120, 255, 0.5)',
    bottom: -120,
    right: -100,
  },

  circle3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(150, 80, 255, 0.4)',
    top: '35%',
    left: '20%',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    letterSpacing: 5,
  },
});

export default SplashScreen;
