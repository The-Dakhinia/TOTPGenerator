import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TOTPGenerator from './screens/totp';
import ButtonScreen from './screens/ButtonScreen';
import LoginScreen from './screens/LoginScreen';
import Geolocation from '@react-native-community/geolocation';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

const Stack = createStackNavigator();

// Component for handling location services
const EnableLocationComponent = ({ onLocationEnabled }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const enableLocationServices = async () => {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('Location enable result:', enableResult);

        if (enableResult === 'enabled' || enableResult === 'already-enabled') {
          setTimeout(() => {
            Geolocation.getCurrentPosition(
              info => {
                console.log('Coordinates:', info.coords.latitude, info.coords.longitude);
                onLocationEnabled();
              },
              error => console.error('Geolocation error:', error.message),
              // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          }, 200);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Location enable error:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    enableLocationServices();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

export default function App() {
  const [locationEnabled, setLocationEnabled] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      {!locationEnabled && (
        <EnableLocationComponent onLocationEnabled={() => setLocationEnabled(true)} />
      )}

      {locationEnabled && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Button" component={ButtonScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TOTP" component={TOTPGenerator} options={{ headerShown: false }} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
