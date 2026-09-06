import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    const parentNavigation = navigation.getParent();

    if (parentNavigation?.canGoBack()) {
      parentNavigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.container}>
      <Text style={styles.arrow}>←</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    padding: 5,
  },

  arrow: {
    position: 'relative',
    top: -17,
    fontSize: 50,
  },
});

export default BackButton;
