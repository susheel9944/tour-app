import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../features/Splash/screens/SplashScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../features/tourdetail/screens/DetailScreen';
import PaymentScreen from '../features/payment/PaymentScreen';
import CameraScreen from '../features/camera/CameraScreen';
import LocationScreen from '../features/location/LocationScreen';

import { RootStackParamList } from '../constant/type';
import LoginScreen from '../features/Login/screens/Login';
import RegisterScreen from '../features/Login/screens/Registration';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],

  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Register: 'register',
      Home: 'home',
      MainTabs: 'main',

      Details: 'details/:itemId',

      Payment: 'payment',
      Camera: 'camera',
      Location: 'location',
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />

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

        <Stack.Screen name="Camera" component={CameraScreen} />

        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
