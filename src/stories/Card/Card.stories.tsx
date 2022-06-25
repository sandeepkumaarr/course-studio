import React from 'react';

import {storiesOf} from '@storybook/react-native';

import {EpisodesCard, DownloadsCard} from '../../components/index';
import CenterView from '../CenterView';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Episodes-Card', () => <EpisodesCard />)
  .add('Downloads-Card', () => <DownloadsCard />);
