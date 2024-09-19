import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';

type LoginScreenProps = {
    navigation: any;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    interface ApiResponse {
        status: number;
        message?: string;
    }

    const handleApiCall = async (loginType: string): Promise<void> => {
        const apiUrl = 'https://your-api-endpoint.com/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    loginType,
                }),
            });

            const result: ApiResponse = await response.json();

            if (response.status === 200) {
                Alert.alert('Login Successful', 'Navigating to the next page...', [
                    { text: 'OK', onPress: () => navigation.navigate('NextPage') },
                ]);
            } else if (response.status === 401) {
                Alert.alert('Unauthorized', 'Please enter valid credentials.');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            Alert.alert('Network Error', 'Internet connectivity is unstable. Please try again.');
        }
    };

    const handleBiometricLogin = (): void => {
        handleApiCall('biometric');
    };

    const handleMPINLogin = (): void => {
        handleApiCall('mpin');
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="User Name"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleApiCall('Button')}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.altButton} onPress={handleBiometricLogin}>
                    <Text style={styles.altButtonText}>Login with Biometric</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.altButton} onPress={handleMPINLogin}>
                    <Text style={styles.altButtonText}>Login with MPIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#4F8EF7',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    altButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
    },
    altButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default LoginScreen;
