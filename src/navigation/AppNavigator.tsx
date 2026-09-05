import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../features/Splash/screens/SplashScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import ExploreScreen from '../features/explore/screens/ExploreScreen';

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

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Explorescreen"
          component={ExploreScreen}
          options={{ headerShown: true, title: 'Explore' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
