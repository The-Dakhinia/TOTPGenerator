import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


type RootStackParamList = {
  Button: undefined;
  TOTP: undefined;
};

type ButtonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Button'>;

interface Props {
  navigation: ButtonScreenNavigationProp;
}

const ButtonScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Generate"
        onPress={() => navigation.navigate('TOTP')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonScreen;
