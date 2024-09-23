import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
    Home: undefined;      // No parameters needed for Home screen
    WebView: { url: string };  // Expecting 'url' parameter for WebView screen
};
//RootStackParamList
// Define the navigation prop types
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}


const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // Function to navigate to WebView screen with a URL parameter
    const openWebsite = (url: string): void => {
        navigation.navigate('WebView', { url });
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Open Instagram" onPress={() => openWebsite('https://www.instagram.com')} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Open Facebook" onPress={() => openWebsite('https://www.facebook.com')} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Open Google" onPress={() => openWebsite('https://www.google.com')} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Open ZTrust" onPress={() => openWebsite('https://www.ztrust.com')} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    buttonContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        marginVertical: 10, // Add vertical space between buttons
    },
});

export default HomeScreen;
