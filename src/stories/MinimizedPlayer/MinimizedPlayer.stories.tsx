import React, {useState} from 'react';

import {storiesOf} from '@storybook/react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {MinimizedPlayer} from '../../components/index';
import CenterView from '../CenterView';

storiesOf('MinimizedPlayer', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('MinimizedPlayer-default', () => <MinimizedPlayer />);
