import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../features/Splash/screens/SplashScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../features/tourdetail/screens/DetailScreen';
import PaymentScreen from '../features/payment/PaymentScreen';
import CameraScreen from '../features/camera/CameraScreen';
import { RootStackParamList } from '../constant/type';
// const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
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
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: 'Take Photo',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
