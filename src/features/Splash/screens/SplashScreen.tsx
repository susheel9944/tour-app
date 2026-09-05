import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View>
      <Image
        source={require('../../../assets/splash.png')}
        style={styles.container}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
