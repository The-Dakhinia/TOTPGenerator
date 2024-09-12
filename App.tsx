import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TOTPGenerator from './screens/totp';
import ButtonScreen from './screens/ButtonScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// App component with navigation setup
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Button">
        <Stack.Screen name="Button" component={ButtonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TOTP" component={TOTPGenerator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
