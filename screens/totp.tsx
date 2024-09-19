import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TOTP } from 'totp-generator';
import generateTotp from 'totp-generator';


const secret: string = 'JZ5FU3K2K5LG2TKUNBWU2MSZPJHEORTKLEZEU2KOIRTXQTTKMMZU4RCFPJMWUWJQJVCFM4LBI44XKPJ5';
const period: number = 30;
const digits: number = 6;

const TOTPGenerator: React.FC = () => {
    const [totpCode, setTotpCode] = useState<string>('');
    const [remainingTime, setRemainingTime] = useState<number>(period);
    const { otp, expires } = TOTP.generate(secret, {
        digits: digits,
        period: period,
        algorithm: 'SHA-1',
    });

    const generateTotp = () => {
        const { otp, expires } = TOTP.generate(secret, {
            digits: digits,
            period: period,
            algorithm: 'SHA-1',
        });
        setTotpCode(otp);
    };

    useEffect(() => {
        generateTotp();

        // Update TOTP every period (e.g., 30 seconds)
        const interval = setInterval(() => {
            generateTotp();
            setRemainingTime(period);
        }, period * 1000);

        // Countdown timer for the refresh
        const countdown = setInterval(() => {
            setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(countdown);
        };
    }, []);

    const timerColor = remainingTime <= 5 ? 'red' : '#666';

    return (
        <View style={styles.container}>
            <View style={styles.totpContainer}>
                <Text style={styles.title}>TOTP Code:</Text>
                <Text style={styles.code}>{otp || 'Generating...'}</Text>
            </View>
            <View style={styles.timerContainer}>
                <Text style={styles.title}>Refreshes in: {expires}</Text>
                <Text style={[styles.timer, { color: timerColor }]}>
                    {remainingTime} seconds
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 250,
    },
    totpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginRight: 10,
        fontWeight: 'bold',
    },
    code: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 18,
    },
});

export default TOTPGenerator;