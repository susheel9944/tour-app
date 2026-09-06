import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CategorySectionProps {
  selectedCity: string | null;
  searchText: string;

  showAllPopular: boolean;
  showAllRecommended: boolean;

  onShowAllPopular: () => void;
  onShowAllRecommended: () => void;
}

const popularData = [
  {
    id: '1',
    title: 'Alley Palace',
    city: 'New York',
    description: 'A beautiful and luxurious place to visit.',
    image: require('../../../asset/popular1.png'),
  },
  {
    id: '2',
    title: 'Coeurdes Alpes',
    city: 'Paris',
    description: 'Experience amazing views and luxury.',
    image: require('../../../asset/popular2.png'),
  },
  {
    id: '3',
    title: 'Grand Resort',
    city: 'Dubai',
    description: 'Enjoy your vacation in a premium resort.',
    image: require('../../../asset/popular3.png'),
  },
  {
    id: '4',
    title: 'Mountain View',
    city: 'Tokyo',
    description: 'Beautiful mountains and natural scenery.',
    image: require('../../../asset/popular4.png'),
  },
];

const recommendedData = [
  {
    id: '5',
    title: 'Luxury Hotel',
    city: 'London',
    description: 'A perfect place for your luxury vacation.',
    image: require('../../../asset/recommended1.png'),
  },
  {
    id: '6',
    title: 'City Resort',
    city: 'New York',
    description: 'Relax and enjoy the best city experience.',
    image: require('../../../asset/recommended2.png'),
  },
  {
    id: '7',
    title: 'Beach Paradise',
    city: 'Dubai',
    description: 'Enjoy a peaceful and relaxing beach.',
    image: require('../../../asset/recommended3.png'),
  },
];

const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCity,
  searchText,
  showAllPopular,
  showAllRecommended,
  onShowAllPopular,
  onShowAllRecommended,
}) => {
  const navigation = useNavigation<any>();

  /**
   * Filter cards based on:
   * 1. Selected City
   * 2. Search Text
   */
  const filterData = (data: any[]) => {
    return data.filter(item => {
      const matchesCity = !selectedCity || item.city === selectedCity;

      const matchesSearch =
        !searchText ||
        item.title.toLowerCase().includes(searchText.toLowerCase());

      return matchesCity && matchesSearch;
    });
  };

  const filteredPopular = filterData(popularData);

  const filteredRecommended = filterData(recommendedData);

  const popularItems = showAllPopular
    ? filteredPopular
    : filteredPopular.slice(0, 2);

  const recommendedItems = showAllRecommended
    ? filteredRecommended
    : filteredRecommended.slice(0, 2);

  /**
   * Navigate to Detail Screen
   */
  const handleCardPress = (item: any) => {
    navigation.navigate('Detail', {
      item,
    });
  };

  /**
   * Popular Card
   */
  const renderPopularCard = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.popularCard}
        activeOpacity={0.8}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={item.image}
          style={styles.popularImage}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>

          <Text style={styles.cityText}>{item.city}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Recommended Card
   */
  const renderRecommendedCard = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.recommendedCard}
        activeOpacity={0.8}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={item.image}
          style={styles.recommendedImage}
          resizeMode="cover"
        />

        <View style={styles.recommendedContent}>
          <Text style={styles.recommendedTitle}>{item.title}</Text>

          <Text style={styles.cityText}>{item.city}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* ================= POPULAR ================= */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular</Text>

        <TouchableOpacity onPress={onShowAllPopular}>
          <Text style={styles.showAllText}>
            {showAllPopular ? 'Show Less' : 'Show All'}
          </Text>
        </TouchableOpacity>
      </View>

      {showAllPopular ? (
        <View style={styles.gridContainer}>
          {popularItems.map(item => renderPopularCard(item))}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {popularItems.map(item => renderPopularCard(item))}
        </ScrollView>
      )}

      {popularItems.length === 0 && (
        <Text style={styles.emptyText}>No popular places found.</Text>
      )}

      {/* ================= RECOMMENDED ================= */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>

        <TouchableOpacity onPress={onShowAllRecommended}>
          <Text style={styles.showAllText}>
            {showAllRecommended ? 'Show Less' : 'Show All'}
          </Text>
        </TouchableOpacity>
      </View>

      {showAllRecommended ? (
        <View style={styles.gridContainer}>
          {recommendedItems.map(item => renderRecommendedCard(item))}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {recommendedItems.map(item => renderRecommendedCard(item))}
        </ScrollView>
      )}

      {recommendedItems.length === 0 && (
        <Text style={styles.emptyText}>No recommended places found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 30,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  showAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },

  horizontalList: {
    paddingLeft: 20,
    paddingRight: 10,
  },

  /* =========================
     POPULAR
  ========================= */

  popularCard: {
    width: 180,
    marginRight: 15,

    backgroundColor: '#fff',

    borderRadius: 15,

    overflow: 'hidden',

    elevation: 3,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.15,

    shadowRadius: 4,
  },

  popularImage: {
    width: '100%',
    height: 160,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  cityText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  /* =========================
     RECOMMENDED
  ========================= */

  recommendedCard: {
    width: 180,
    marginRight: 15,

    backgroundColor: '#fff',

    borderRadius: 15,

    overflow: 'hidden',

    elevation: 3,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.15,

    shadowRadius: 4,
  },

  recommendedImage: {
    width: '100%',
    height: 130,
  },

  recommendedContent: {
    padding: 12,
  },

  recommendedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  /* =========================
     GRID
  ========================= */

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingHorizontal: 20,

    justifyContent: 'space-between',
  },

  emptyText: {
    textAlign: 'center',

    color: '#777',

    marginVertical: 20,

    fontSize: 15,
  },
});

export default CategorySection;
