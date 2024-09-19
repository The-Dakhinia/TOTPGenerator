import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TOTPGenerator from './screens/totp';
import ButtonScreen from './screens/ButtonScreen';
import LoginScreen from './screens/LoginScreen';
import Geolocation from '@react-native-community/geolocation';

const Stack = createStackNavigator();

export default function App() {
  // Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: "always", locationProvider: "android" });
  Geolocation.getCurrentPosition(info => console.log(info.coords.latitude + " " + info.coords.longitude));
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Button" component={ButtonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TOTP" component={TOTPGenerator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
