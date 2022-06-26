import React, {useContext} from 'react';

import {storiesOf} from '@storybook/react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Button, MaximizedPlayer} from '../../components/index';
import CenterView from '../CenterView';
import {AudioContextInterface, AudioContext} from '../../context/AudioContext';

storiesOf('MaximizedPlayer', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('MaximizedPlayer-default', () =>
    React.createElement(() => {
      const {handlePlayerModalPress} = useContext(
        AudioContext,
      ) as AudioContextInterface;

      return (
        <>
          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(60)}`}
            iconHeight={`${verticalScale(60)}`}
            buttonIcon={'play'}
            onPress={handlePlayerModalPress}
            marginTop={10}
          />
          <MaximizedPlayer />
        </>
      );
    }),
  );
