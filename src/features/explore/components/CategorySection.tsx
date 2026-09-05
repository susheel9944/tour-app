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

const { width } = Dimensions.get('window');

const CategorySection = () => {
  // Sample data for popular items
  const popularItems = [
    {
      id: 1,
      title: 'Alley Palace',
      rating: 4.1,
      stars: 4,
      image: IMAGES.alleyPalace,
      isRecommended: false,
    },
    {
      id: 2,
      title: 'Explore Aspen',
      duration: '4N/5D',
      description: 'Luxurious Aspen',
      image: IMAGES.exploreAspen,
      isRecommended: false,
    },
    {
      id: 3,
      title: 'Mountain View',
      rating: 4.5,
      stars: 5,
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
      image: IMAGES.mountainView,
      isRecommended: true,
    },
    {
      id: 5,
      title: 'Winter Escape',
      duration: '3N/4D',
      image: IMAGES.skiAdventure,
      isRecommended: true,
    },
    {
      id: 6,
      title: 'Ski Adventure',
      duration: '4N/5D',
      image: IMAGES.winterEscape,
      isRecommended: true,
    },
  ];

  type PopularItem = {
    id: number;
    title: string;
    rating?: number;
    stars?: number;
    image: ImageSourcePropType;
    isRecommended: boolean;
    duration?: string;
    description?: string;
  };

  type RecommendedItem = {
    id: number;
    title: string;
    duration: string;
    image: ImageSourcePropType;
    isRecommended: boolean;
  };

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

  const renderSectionHeader = (title: string, seeAll = true) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {seeAll && (
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPopularCard = (item: PopularItem) => (
    <TouchableOpacity key={item.id} style={styles.popularCard}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        {item.isRecommended && (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
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

      {item.duration && (
        <View style={styles.durationContainer}>
          <Icon name="time-outline" size={14} color="#666" />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      )}

      {item.description && (
        <Text style={styles.descriptionText}>{item.description}</Text>
      )}
    </TouchableOpacity>
  );

  const renderRecommendedCard = (item: RecommendedItem) => (
    <TouchableOpacity key={item.id} style={styles.recommendedCard}>
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
        {renderSectionHeader('Popular')}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {popularItems.map(item => renderPopularCard(item))}
        </ScrollView>
      </View>

      {/* Recommended Section */}
      <View style={styles.section}>
        {renderSectionHeader('Recommended', false)}
        <View style={styles.recommendedGrid}>
          {recommendedItems.map(item => renderRecommendedCard(item))}
        </View>
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
});

export default CategorySection;
