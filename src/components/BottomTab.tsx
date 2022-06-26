import {StyleSheet} from 'react-native';
import React from 'react';

import {scale, verticalScale} from 'react-native-size-matters';

import Box from './Box';
import Button from './Button';
import routes from '../navigation/routes';

import * as RootNavigation from '../navigation/RootNavigation';

const BottomTab = () => {
  return (
    <Box
      flexDirection={'row'}
      backgroundColor="bottomTabBackground"
      justifyContent={'space-around'}
      alignItems="center">
      <Button
        alignItems={'center'}
        paddingVertical={5}
        paddingHorizontal={20}
        showIcon
        iconWidth={`${scale(30)}`}
        iconHeight={`${verticalScale(35)}`}
        buttonIcon={'home'}
        onPress={() => {
          RootNavigation.navigate(routes.HOME_SCREEN as never, {} as never);
        }}
      />

      <Button
        alignItems={'center'}
        paddingVertical={5}
        paddingHorizontal={20}
        showIcon
        iconWidth={`${scale(35)}`}
        iconHeight={`${verticalScale(35)}`}
        buttonIcon={'download'}
        onPress={() => {
          RootNavigation.navigate(routes.DOWNLOAD_SCREEN as never, {} as never);
        }}
      />
    </Box>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
