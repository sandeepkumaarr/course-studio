import React, {useState} from 'react';

import {storiesOf} from '@storybook/react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Button} from '../../components/index';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Google', () => (
    <Button
      showIcon
      label={'Continue with Google'}
      backgroundColor={'primary'}
      variant="google"
      marginHorizontal={5}
      textVariants="google"
      iconWidth={`${scale(24)}`}
      iconHeight={`${verticalScale(24)}`}
    />
  ))
  .add('Play-Pause', () =>
    React.createElement(() => {
      const [isPlay, setIsPlay] = useState(false);

      return (
        <>
          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(30)}`}
            buttonIcon={isPlay ? 'pause' : 'play'}
            onPress={() => setIsPlay(prevState => !prevState)}
          />

          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(60)}`}
            iconHeight={`${verticalScale(60)}`}
            buttonIcon={isPlay ? 'pause' : 'play'}
            onPress={() => setIsPlay(prevState => !prevState)}
            marginTop={10}
          />

          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(30)}`}
            buttonIcon={isPlay ? 'download' : 'play'}
            onPress={() => setIsPlay(prevState => !prevState)}
            marginTop={10}
          />
        </>
      );
    }),
  )
  .add('Minimize', () => (
    <Button
      alignItems={'center'}
      showIcon
      iconWidth={`${scale(30)}`}
      iconHeight={`${verticalScale(30)}`}
      buttonIcon={'minimize'}
    />
  ));
