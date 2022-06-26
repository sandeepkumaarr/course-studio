import {StyleSheet, Dimensions} from 'react-native';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import Box from './Box';
import Button from './Button';
import Text from './Text';
import Card from './Cards/Card';
import FastImage from 'react-native-fast-image';
import Slider from '@react-native-community/slider';
import {AudioContextInterface, AudioContext} from '../context/AudioContext';

const {width} = Dimensions.get('window');

type Props = {};

const MaximizedPlayer = ({...rest}: Props) => {
  // variables
  const snapPointsProject = useMemo(() => ['70%', '95%'], []);
  const [isPlay, setIsPlay] = useState(false);
  const {PlayerModalRef, handlePlayerModalClose} = useContext(
    AudioContext,
  ) as AudioContextInterface;

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const renderProjectBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        handleStyle={{
          backgroundColor: '#e5e5e5',
        }}
        backdropComponent={renderProjectBackdrop}
        ref={PlayerModalRef}
        index={1}
        snapPoints={snapPointsProject}>
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
                onPress={handlePlayerModalClose}
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

          <Box alignItems={'center'} marginTop={10}>
            <Slider
              style={{width: width - 50, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#9deec4"
              maximumTrackTintColor="#303030"
            />
          </Box>

          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}
            marginTop={5}>
            <Box>
              <Text variant={'maxPlayerTime'}>1.35</Text>
            </Box>

            <Box>
              <Button
                alignItems={'center'}
                showIcon
                iconWidth={`${scale(100)}`}
                iconHeight={`${verticalScale(100)}`}
                buttonIcon={isPlay ? 'pause' : 'play'}
                onPress={() => setIsPlay(prevState => !prevState)}
              />
            </Box>

            <Box>
              <Text variant={'maxPlayerTime'}>1.35</Text>
            </Box>
          </Box>
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
