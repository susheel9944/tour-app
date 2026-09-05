import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const categories = [
  { id: '1', title: 'Location' },
  { id: '2', title: 'Hotels' },
  { id: '3', title: 'Food' },
  { id: '4', title: 'Adventure' },
  { id: '5', title: 'Activities' },
];

const CategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Location');

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.title;

          return (
            <Pressable
              style={[styles.category, isSelected && styles.selectedCategory]}
              onPress={() => setSelectedCategory(item.title)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  listContainer: {
    paddingHorizontal: 20,
  },

  category: {
    paddingHorizontal: 17,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
  },

  selectedCategory: {
    backgroundColor: '#F1F7FF',
  },

  categoryText: {
    fontSize: 14,
    color: '#B0B0B0',
    fontWeight: '500',
  },

  selectedCategoryText: {
    color: '#1677FF',
    fontWeight: '600',
  },
});

export default CategoryMenu;
