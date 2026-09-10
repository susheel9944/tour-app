import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const LocationScreen = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState('');

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        return (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }

      if (Platform.OS === 'ios') {
        const authorization = await Geolocation.requestAuthorization(
          'whenInUse',
        );

        console.log('iOS Location Authorization:', authorization);

        return authorization === 'granted';
      }

      return false;
    } catch (error) {
      console.error('Permission error:', error);
      setError('Unable to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setError('');

    const permission = await requestLocationPermission();

    if (!permission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        setLocation({
          latitude,
          longitude,
        });
      },

      locationError => {
        console.log(
          'Location Error:',
          locationError.code,
          locationError.message,
        );

        setError(locationError.message);
      },

      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };

  const initialRegion: Region = {
    latitude: location?.latitude ?? 20.5937,
    longitude: location?.longitude ?? 78.9629,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
            description="You are here"
          />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <Text style={styles.locationButtonText}>📍 Get Current Location</Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.info}>
          <Text>Latitude: {location.latitude}</Text>

          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFill,
  },

  locationButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  info: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },

  error: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    color: 'red',
    backgroundColor: '#fff',
    padding: 10,
  },
});
