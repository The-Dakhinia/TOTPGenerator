import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewExample: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState<string>('https://www.google.com'); // Default to Google

    // Function to update the URL based on button pressed
    const openWebsite = (url: string): void => {
        setCurrentUrl(url);
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

            {currentUrl !== '' && (
                <WebView
                    key={currentUrl} // Add key prop to force remount on URL change
                    source={{ uri: currentUrl }}
                    style={styles.webView}
                />
            )}
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
        marginVertical: 10,
    },
    webView: {
        flex: 1,
    },
});

export default WebViewExample;
