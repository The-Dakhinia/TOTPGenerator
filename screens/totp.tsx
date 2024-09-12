import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CryptoJS from 'crypto-js';

const secret: string = 'KBLVO432JR2UCM3VJ5UTA6KLIR2EQ23U';
const period: number = 30;
const digits: number = 6;
const algorithm: 'SHA1' = 'SHA1';

const base32ToBinary = (base32: string): Uint8Array => {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (const char of base32.toUpperCase()) {
        if (base32Chars.includes(char)) {
            bits += base32Chars.indexOf(char).toString(2).padStart(5, '0');
        }
    }
    return new Uint8Array(bits.match(/.{8}/g)!.map(byte => parseInt(byte, 2)));
};

const uint8ArrayToHex = (uint8Array: Uint8Array): string => {
    return Array.from(uint8Array).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const generateOtp = (secret: string, digits: number, counter: number): string => {
    const secretBinary = base32ToBinary(secret);
    const counterBuffer = new Uint8Array(8);
    new DataView(counterBuffer.buffer).setBigUint64(0, BigInt(counter), false);

    const hmac = CryptoJS.HmacSHA1(
        uint8ArrayToHex(counterBuffer),
        uint8ArrayToHex(secretBinary)
    );
    const hmacHex = hmac.toString(CryptoJS.enc.Hex);

    const offset = parseInt(hmacHex.slice(-1), 16) * 2;
    const binary = parseInt(hmacHex.slice(offset, offset + 8), 16) & 0x7fffffff;
    const otp = binary % Math.pow(10, digits);
    return otp.toString().padStart(digits, '0');
};

const TOTPGenerator: React.FC = () => {
    const [totpCode, setTotpCode] = useState<string>('');
    const [remainingTime, setRemainingTime] = useState<number>(period);

    const generateTotp = () => {
        const counter = Math.floor(Date.now() / 1000 / period);
        const code = generateOtp(secret, digits, counter);
        setTotpCode(code);
    };

    useEffect(() => {
        generateTotp();

        const interval = setInterval(() => {
            generateTotp();
            setRemainingTime(period);
        }, period * 1000);

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
                <Text style={styles.code}>{totpCode || 'Generating...'}</Text>
            </View>
            <View style={styles.timerContainer}>
                <Text style={styles.title}>Refreshes in:</Text>
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
