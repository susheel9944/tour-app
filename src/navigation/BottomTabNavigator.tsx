import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreScreen from '../features/explore/screens/ExploreScreen';
import BackButton from '../components/BackButton';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: true,
          headerTitle: 'Explore',
          headerLeft: () => <BackButton />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
