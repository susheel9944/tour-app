import { ImageSourcePropType } from 'react-native';

export type DetailItem = {
  id: number;
  title: string;
  city: string;
  description: string;
  rating?: number;
  stars?: number;
  image: ImageSourcePropType;
};

export type ExploreStackParamList = {
  ExploreHome: undefined;

  Details: {
    item: DetailItem;
  };
};
