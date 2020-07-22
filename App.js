/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MainScreen from './src/screen/mainScreen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
      <AnimatedCircularProgress
          size={200}
          width={3}
          fill={100}
          duration={5650000}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => 
            {
              const a = (60 * fill) / 100
              return (
              <Text>
                {a}
              </Text>
            )}
          }
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          size={200}
          width={3}
          fill={100}
          duration={60000}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text>
                {Math.round((60 * fill) / 100)}
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </SafeAreaView>
    </>
  );
};

export default App;
