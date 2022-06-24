/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar, StyleSheet, LogBox} from 'react-native';
import Navigator from './src/navigation/Navigator';

import theme from './src/themes/default';

LogBox.ignoreAllLogs();

const STORYBOOK_START = false;

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </>
  );
};

export default STORYBOOK_START ? require('./storybook').default : App;
