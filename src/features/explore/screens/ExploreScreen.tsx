import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { Linking } from 'react-native';

import SearchInput from '../components/SearchInput';
import CategoryMenu from '../components/CategoryMenu';
import CategorySection from '../components/CategorySection';

const ExploreScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // NEW STATE
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  const cities = [
    { label: 'All', value: '' },
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Tokyo', value: 'Tokyo' },
  ];
  useEffect(() => {
    // When app is already open
    const subscription = Linking.addEventListener('url', event => {
      console.log('Deep link received:', event.url);
    });

    // When app is opened using deep link
    Linking.getInitialURL().then(url => {
      console.log('Initial URL:', url);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View>
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
            onChange={item => {
              setSelectedCity(item.value || null);
            }}
          />
        </View>

        <View style={styles.searchWrapper}>
          <SearchInput value={searchText} onChangeText={setSearchText} />
        </View>

        <CategoryMenu />

        <CategorySection
          selectedCity={selectedCity}
          searchText={searchText}
          showAllPopular={showAllPopular}
          showAllRecommended={showAllRecommended}
          onShowAllPopular={() => setShowAllPopular(!showAllPopular)}
          onShowAllRecommended={() =>
            setShowAllRecommended(!showAllRecommended)
          }
        />
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
