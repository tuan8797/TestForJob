/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import MainScreen from './src/screen/mainScreen';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <MainScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
