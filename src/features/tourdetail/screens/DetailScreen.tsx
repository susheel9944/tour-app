import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGESICON } from '../../../constant/images/Images';

const DetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { item } = route.params as any;

  console.log('item details page', item);

  const handleBookNow = () => {
    console.log('Book Now clicked', item);

    navigation.navigate('Payment', {
      item: item,
      amount: Number(item.price || 199),
    });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <Text style={styles.title}>{item.title}</Text>

        {item.city && <Text style={styles.city}>{item.city}</Text>}

        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        {item.duration && (
          <View style={styles.durationContainer}>
            <Icon name="time-outline" size={18} color="#666" />

            <Text style={styles.duration}>{item.duration}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>

          <Text style={styles.price}>${item.price || '199'}</Text>
        </View>

        {/* Book Now */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNow}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>

          <Image
            source={IMAGESICON.arrow}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },

  city: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },

  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
    lineHeight: 24,
  },

  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  duration: {
    fontSize: 15,
    color: '#666',
    marginLeft: 6,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',

    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 8,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 10,
  },

  priceContainer: {
    flex: 1,
  },

  priceLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },

  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#20C9A6',
    marginTop: 2,
  },

  bookButton: {
    height: 64,
    minWidth: 190,

    backgroundColor: '#2176E8',

    borderRadius: 30,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 25,

    shadowColor: '#2176E8',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 6,
  },

  bookButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 15,
  },

  arrowImage: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
});

export default DetailScreen;
