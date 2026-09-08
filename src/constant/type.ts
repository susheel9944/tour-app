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

export type ExploreStackParamList = {
  ExploreHome: undefined;

  Details: {
    item: DetailItem;
  };
};

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  MainTabs: undefined;

  Details: {
    item: DetailItem;
  };

  Payment: undefined;
  Camera: undefined;
};
