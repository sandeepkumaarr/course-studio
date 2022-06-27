import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import Box from './Box';
import Button from './Button';
import Text from './Text';
import Card from './Cards/Card';
import {AudioContextInterface, AudioContext} from '../context/AudioContext';
import AudioPlayer from './AudioPlayer';
import * as AppState from '../types/commons';
import {setMaxPlayerSizeActionCreator} from '../redux/reducers/AudioReducer';

type Props = {};

const MaximizedPlayer = ({...rest}: Props) => {
  const dispatch = useDispatch();

  const maxPlayerSize = useSelector(
    (state: AppState.State) => state.Audio?.maxPlayerSize,
  );

  const {PlayerModalRef} = useContext(AudioContext) as AudioContextInterface;

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enablePanDownToClose={false}
        handleStyle={{
          backgroundColor: '#e5e5e5',
        }}
        ref={PlayerModalRef}
        index={1}
        snapPoints={maxPlayerSize}>
        <Box backgroundColor={'authBackground'} flex={1}>
          <Box
            flexDirection={'row'}
            alignItems="center"
            justifyContent={'space-between'}>
            <Box>
              <Button
                alignItems={'center'}
                paddingHorizontal={5}
                showIcon
                iconWidth={`${scale(30)}`}
                iconHeight={`${verticalScale(30)}`}
                buttonIcon={'minimize'}
                onPress={() =>
                  dispatch(setMaxPlayerSizeActionCreator(['1%', '2%']))
                }
              />
            </Box>
            <Box>
              <Text variant={'header'}>Now Playing</Text>
            </Box>
            <Box>
              <Button
                alignItems={'center'}
                paddingHorizontal={5}
                showIcon
                iconWidth={`${scale(30)}`}
                iconHeight={`${verticalScale(30)}`}
                buttonIcon={'download'}
              />
            </Box>
          </Box>

          <Card variant={'imageShadow'} alignItems="center" marginTop={15}>
            <FastImage
              style={styles.image}
              source={{
                uri: 'https://picsum.photos/200',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Card>
          <AudioPlayer />
        </Box>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default MaximizedPlayer;

const styles = StyleSheet.create({
  image: {
    width: Math.round(moderateScale(250)),
    height: Math.round(moderateScale(250)),
    borderRadius: 20,
  },
  sliderStyle: {
    width: '100%',
    height: 40,
  },
});
