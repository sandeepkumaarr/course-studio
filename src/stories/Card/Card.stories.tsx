import React from 'react';

import {storiesOf} from '@storybook/react-native';

import {EpisodesCard} from '../../components/index';
import CenterView from '../CenterView';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Episodes-Card', () => (
    <EpisodesCard
      created_at={''}
      id={0}
      name={''}
      url={''}
      index={0}
      isDownloads={false}
    />
  ));
