import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Box from './Box';
import Text from './Text';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import AudioPlayer from './AudioPlayer';

const {width} = Dimensions.get('window');

const MinimizedPlayer = () => {
  return (
    <>
      <Box
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
        backgroundColor="primary"
        paddingVertical={3}
        borderRadius={2}>
        <Box flexDirection={'row'} alignItems="center">
          <Box paddingHorizontal={5}>
            <FastImage
              style={styles.image}
              source={{
                uri: 'https://picsum.photos/200',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Box>
          <Box flexDirection={'row'} width={Math.round(width / 1.6)}>
            <Text variant="miniplayerText" numberOfLines={2}>
              Good Inside Episode 4: What Should I Say When My Kid Is Afraid?
            </Text>
          </Box>
        </Box>

        <Box paddingRight={5} marginBottom={5}>
          <AudioPlayer
            showSlider={false}
            showDuration={false}
            playerIconWidth={30}
            playerIconHeight={30}
          />
        </Box>
      </Box>
    </>
  );
};

export default MinimizedPlayer;

const styles = StyleSheet.create({
  image: {
    width: Math.round(moderateScale(50)),
    height: Math.round(moderateScale(50)),
    borderRadius: 10,
  },
});
