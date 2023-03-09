import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Header from './src/components/Header';
import GameScreen from './src/screens/GameScreen';
import StartGameScreen from './src/screens/StartGameScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  {/* Para que tenga un tiempo
  React.useEffect(() => {
    setTimeout(() => {
      setUserNumber(1);
    }, 10000)
  }, []) */}

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView} >
      <Header title="Adivina el numero" />
      {
        !userNumber
          ? <StartGameScreen onStartGame={startGameHandler} />
          : <GameScreen userOption={userNumber} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});