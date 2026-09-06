import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../constant/images/Images';
import { useNavigation } from '@react-navigation/native';
import { ExploreStackParamList, DetailItem } from '../../../constant/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type CategorySectionProps = {
  selectedCity: string | null;
  searchText: string;

  showAllPopular: boolean;
  showAllRecommended: boolean;

  onShowAllPopular: () => void;
  onShowAllRecommended: () => void;
};

type PopularItem = {
  id: number;
  title: string;
  rating?: number;
  stars?: number;
  image: ImageSourcePropType;
  isRecommended: boolean;
  duration?: string;
  description: string;
  city: string;
};

type RecommendedItem = {
  id: number;
  title: string;
  duration: string;
  city: string;
  description: string;
  rating?: number;
  stars?: number;
  image: ImageSourcePropType;
  isRecommended: boolean;
};

type NavigationProp = NativeStackNavigationProp<
  ExploreStackParamList,
  'ExploreHome'
>;

const CategorySection = ({
  selectedCity,
  searchText,
  showAllPopular,
  showAllRecommended,
  onShowAllPopular,
  onShowAllRecommended,
}: CategorySectionProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = (item: DetailItem) => {
    console.log('Selected item:', item);

    navigation.navigate('Details', {
      item,
    });
  };
  // Sample data for popular items
  const popularItems = [
    {
      id: 1,
      title: 'Alley Palace',
      duration: '2N/4D',
      rating: 4.1,
      stars: 4,
      city: 'New York',
      description: 'Semi Luxurious',
      image: IMAGES.alleyPalace,
      isRecommended: false,
    },
    {
      id: 2,
      title: 'Explore Aspen',
      duration: '4N/5D',
      city: 'Paris',
      description: 'Luxurious Aspen',
      image: IMAGES.exploreAspen,
      isRecommended: false,
    },
    {
      id: 3,
      title: 'Mountain View',
      duration: '1N/2D',
      description: 'Luxurious Aspen',
      rating: 4.5,
      stars: 5,
      city: 'London',
      image: IMAGES.luxuriousAspen,
      isRecommended: false,
    },
  ];

  // Sample data for recommended items
  const recommendedItems = [
    {
      id: 4,
      title: 'Luxurious Aspen',
      duration: '2N/3D',
      city: 'New York',
      description: 'Lower Luxurious',
      image: IMAGES.mountainView,
      isRecommended: true,
    },
    {
      id: 5,
      title: 'Winter Escape',
      duration: '3N/4D',
      city: 'Paris',
      description: ' Luxurious',
      image: IMAGES.skiAdventure,
      isRecommended: true,
    },
    {
      id: 6,
      title: 'Ski Adventure',
      duration: '4N/5D',
      city: 'London',
      description: 'Semi Luxurious',
      image: IMAGES.winterEscape,
      isRecommended: true,
    },
  ];

  const search = searchText.trim().toLowerCase();

  const filteredPopularItems = popularItems.filter(item => {
    const matchesCity = !selectedCity || item.city === selectedCity;

    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.city.toLowerCase().includes(search);

    return matchesCity && matchesSearch;
  });

  const filteredRecommendedItems = recommendedItems.filter(item => {
    const matchesCity = !selectedCity || item.city === selectedCity;

    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.city.toLowerCase().includes(search);

    return matchesCity && matchesSearch;
  });

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="star" size={14} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color="#FFD700" />,
      );
    }
    return stars;
  };

  const renderSectionHeader = (
    title: string,
    showAll: boolean,
    onPress: () => void,
  ) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAllText}>
          {showAll ? 'Show less' : 'See all'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPopularCard = (item: PopularItem, isGrid = false) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.popularCard, isGrid && styles.popularCardGrid]}
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>

      {item.rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>

          <View style={styles.starsContainer}>
            {renderRatingStars(item.rating)}
          </View>
        </View>
      )}

      <View style={styles.durationContainer}>
        <Icon name="time-outline" size={14} color="#666" />

        <Text style={styles.durationText}>{item.duration}</Text>
      </View>

      <Text style={styles.descriptionText}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderRecommendedCard = (item: RecommendedItem) => (
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

        <View style={styles.durationContainer}>
          <Icon name="time-outline" size={14} color="#666" />

          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Popular Section */}
      <View style={styles.section}>
        {renderSectionHeader('Popular', showAllPopular, onShowAllPopular)}

        {showAllPopular ? (
          <View style={styles.popularGrid}>
            {filteredPopularItems.map(item => renderPopularCard(item))}
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {filteredPopularItems.map(item => renderPopularCard(item))}
          </ScrollView>
        )}
      </View>

      {/* Recommended Section */}
      <View style={styles.section}>
        {renderSectionHeader(
          'Recommended',
          showAllRecommended,
          onShowAllRecommended,
        )}

        {showAllRecommended ? (
          <View style={styles.recommendedGrid}>
            {filteredRecommendedItems.map(item => renderRecommendedCard(item))}
          </View>
        ) : (
          <View style={styles.recommendedGrid}>
            {filteredRecommendedItems
              .slice(0, 2)
              .map(item => renderRecommendedCard(item))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 30,
  },
  locationHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
  },
  locationSubText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  findButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  findButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginTop: 1,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#000',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '500',
  },
  horizontalScroll: {
    marginHorizontal: -20,
  },
  horizontalScrollContent: {
    paddingHorizontal: 20,
  },
  popularCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#0066FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendedCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  recommendedImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  recommendedContent: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  popularCardGrid: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CategorySection;
