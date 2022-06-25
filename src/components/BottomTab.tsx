import {StyleSheet} from 'react-native';
import React from 'react';

import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';

import Box from './Box';
import Button from './Button';
import routes from '../navigation/routes';

const BottomTab = () => {
  const navigation = useNavigation() || {};
  const {name} = useRoute() || {};

  return (
    <Box
      flexDirection={'row'}
      backgroundColor="bottomTabBackground"
      justifyContent={'space-around'}
      alignItems="center">
      <Button
        alignItems={'center'}
        backgroundColor={
          name === routes.HOME_SCREEN
            ? 'bottomTabHighlight'
            : 'bottomTabBackground'
        }
        paddingVertical={5}
        paddingHorizontal={20}
        showIcon
        iconWidth={`${scale(30)}`}
        iconHeight={`${verticalScale(35)}`}
        buttonIcon={'home'}
        onPress={() => {
          if (name !== routes.HOME_SCREEN) {
            navigation.navigate(routes.HOME_SCREEN as never, {} as never);
          }
        }}
      />

      <Button
        alignItems={'center'}
        backgroundColor={
          name === routes.DOWNLOAD_SCREEN
            ? 'bottomTabHighlight'
            : 'bottomTabBackground'
        }
        paddingVertical={5}
        paddingHorizontal={20}
        showIcon
        iconWidth={`${scale(35)}`}
        iconHeight={`${verticalScale(35)}`}
        buttonIcon={'download'}
        onPress={() => {
          if (name !== routes.DOWNLOAD_SCREEN) {
            navigation.navigate(routes.DOWNLOAD_SCREEN as never, {} as never);
          }
        }}
      />
    </Box>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
