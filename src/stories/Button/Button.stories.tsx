import React from 'react';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import {Button} from '../../components/index';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Selected Button', () => (
    <Button
      onPress={() => console.log('Button Pressed')}
      label={'Default Button'}
      backgroundColor={'secondary'}
      variant="subcategory"
      marginHorizontal={5}
      textVariants="button"
    />
  ))
  .add('UnSelected Button', () => (
    <Button
      onPress={() => console.log('Button Pressed')}
      label={'Default Button'}
      backgroundColor={'primary'}
      variant="subcategory"
      marginHorizontal={5}
      textVariants="buttonoff"
    />
  ));
