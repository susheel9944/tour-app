// constant/data/tourData.ts

import { IMAGES } from '../images/Images';
import { DetailItem } from '../type';

export const popularItems: DetailItem[] = [
  {
    id: 1,
    title: 'Alley Palace',
    city: 'New York',
    description: 'Semi Luxurious',
    rating: 4.1,
    stars: 4,
    price: 6,
    order_id: 132467,
    image: IMAGES.alleyPalace,
  },

  {
    id: 2,
    title: 'Explore Aspen',
    city: 'Paris',
    description: 'Luxurious Aspen',
    rating: 2.1,
    stars: 3,
    price: 4,
    order_id: 9060594,
    image: IMAGES.exploreAspen,
  },

  {
    id: 3,
    title: 'Mountain View',
    city: 'London',
    description: 'Luxurious Aspen',
    rating: 4.5,
    stars: 1,
    price: 309,
    order_id: 540329659,
    image: IMAGES.luxuriousAspen,
  },
];

export const recommendedItems: DetailItem[] = [
  {
    id: 4,
    title: 'Luxurious Aspen',
    city: 'New York',
    description: 'Lower Luxurious',
    price: 3,
    order_id: 9123876432,
    image: IMAGES.mountainView,
  },

  {
    id: 5,
    title: 'Winter Escape',
    city: 'Paris',
    description: 'Luxurious',
    price: 2,
    order_id: 85392005933235,
    image: IMAGES.skiAdventure,
  },

  {
    id: 6,
    title: 'Ski Adventure',
    city: 'London',
    description: 'Semi Luxurious',
    price: 1,
    order_id: 5934030960409324,
    image: IMAGES.winterEscape,
  },
];

export const allTours: DetailItem[] = [...popularItems, ...recommendedItems];
