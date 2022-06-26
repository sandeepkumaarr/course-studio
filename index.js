/**
 * @format
 */

import 'react-native-get-random-values';

import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {
  navigationRef,
  routeNameRef,
  isReadyRef,
} from './src/navigation/RootNavigation';
import store from './src/redux/store';
import AudioProvider from './src/context/AudioContext';

const Root = () => {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <AudioProvider>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <App />
        </NavigationContainer>
      </Provider>
    </AudioProvider>
  );
};

enableScreens();
AppRegistry.registerComponent(appName, () => Root);
