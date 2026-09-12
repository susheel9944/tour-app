import { ImageSourcePropType } from 'react-native';

export type DetailItem = {
  id: number;
  title: string;
  city: string;
  description: string;
  rating?: number;
  stars?: number;
  price: number;
  order_id: number;
  image: ImageSourcePropType;
};

export type TourItem = {
  id: string;
  title: string;
  city?: string;
  duration?: string;
  price?: number;
  image: any;
  description?: string;
  rating?: number;
  stars?: number;
};

export type ExploreStackParamList = {
  ExploreHome: undefined;

  Details: {
    itemId: DetailItem;
  };
};

// export type RootStackParamList = {
//   Splash: undefined;
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
//   MainTabs: undefined;

//   Details: {
//     item: DetailItem;
//   };

//   Payment: undefined;
//   Camera: undefined;
//   Location: undefined;
// };

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MainTabs: undefined;

  Details: {
    itemId: string;
  };

  Payment: {
    item: DetailItem;
    amount: number;
  };

  Camera: undefined;
  Location: undefined;
};
