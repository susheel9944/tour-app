import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchInput = ({ value, onChangeText }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by city or title"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },

  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default SearchInput;
