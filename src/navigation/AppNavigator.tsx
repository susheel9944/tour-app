import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../features/Splash/screens/SplashScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../features/tourdetail/screens/DetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Home - NO BottomTab */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Explore - BottomTab is visible */}
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            headerShown: true,
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
