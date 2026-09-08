import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const camera = useRef<any>(null);

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePhoto = async () => {
    try {
      if (camera.current == null) {
        return;
      }

      const photo = await camera.current.takePhoto();

      console.log('Photo:', photo);
      console.log('Photo Path:', photo.path);
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.center}>
        <Text>Camera device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
