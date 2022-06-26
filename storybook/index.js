import React from 'react';

import {AppRegistry} from 'react-native';

import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import {loadStories} from './storyLoader';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import AudioProvider from '../src/context/AudioContext';
import store from '../src/redux/store';

import theme from '../src/themes/default';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

addDecorator(story => (
  <AudioProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>{story()}</ThemeProvider>
    </Provider>
  </AudioProvider>
));

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage:
    require('@react-native-async-storage/async-storage').default ||
    require('react-native').AsyncStorage ||
    null,
});
// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
