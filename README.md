# TOTP Generator App

This is a simple React Native app that generates Time-based One-Time Passwords (TOTP). The app includes a home screen with a button that navigates to a screen where a TOTP code is generated and displayed.

## Features
- **Button Screen**: A button to trigger the generation of a TOTP code.
- **TOTP Screen**: Generates and displays a TOTP code which refreshes every 30 seconds.

## Technology Stack
- **React Native**: For building the cross-platform mobile app.
- **Expo**: To manage the development environment.
- **React Navigation**: For navigating between screens.

## Screens
1. **Button Screen**: A simple screen with a button that navigates to the TOTP generation screen.
2. **TOTP Screen**: Displays a TOTP code and updates it every 30 seconds.

## Requirements
- [Node.js](https://nodejs.org/) (v14 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [React Native](https://reactnative.dev/)
- [Android/iOS simulator or a physical device](https://reactnative.dev/docs/running-on-device)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/totp-generator-app.git
    cd totp-generator-app
    ```

2. Install the project dependencies:
    ```bash
    npm install
    ```

3. Install Expo CLI if you haven't already:
    ```bash
    npm install -g expo-cli
    ```

4. Start the development server:
    ```bash
    npx expo start
    ```

5. Use the Expo app on your mobile device or an emulator to run the project by scanning the QR code provided in the Expo CLI.

## Project Structure

```plaintext
├── App.tsx                   # Entry point of the app
├── screens/
│   ├── ButtonScreen.tsx       # Screen with a button to generate the TOTP code
│   ├── TOTPGenerator.tsx      # Screen that generates and displays the TOTP code
├── node_modules/              # Project dependencies
├── package.json               # Project configuration and dependencies
└── README.md                  # Project documentation
