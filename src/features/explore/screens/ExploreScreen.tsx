import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SearchInput from '../components/SearchInput';
import CategoryMenu from '../components/CategoryMenu';
import CategorySection from '../components/CategorySection';

const ExploreScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    { label: 'New York', value: 'new_york' },
    { label: 'London', value: 'london' },
    { label: 'Paris', value: 'paris' },
    { label: 'Dubai', value: 'dubai' },
    { label: 'Tokyo', value: 'tokyo' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.exploreText}>Exploresss</Text>
            <Text style={styles.logoText}>ASPEN</Text>
          </View>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={cities}
            labelField="label"
            valueField="value"
            placeholder="City"
            value={selectedCity}
            onChange={item => setSelectedCity(item.value)}
          />
        </View>

        <View style={styles.searchWrapper}>
          <SearchInput />
        </View>

        <CategoryMenu />

        <CategorySection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  exploreText: {
    fontSize: 16,
    color: '#666',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdown: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#777',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default ExploreScreen;
