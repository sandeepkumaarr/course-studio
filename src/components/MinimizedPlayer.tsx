import {StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Box from './Box';
import Button from './Button';
import Text from './Text';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

const {width} = Dimensions.get('window');

const MinimizedPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <>
      <Progress.Bar
        progress={0.3}
        width={width}
        color="#9deec4"
        unfilledColor="#e5e5e5"
        borderColor="#303030"
      />
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

        <Box paddingRight={5}>
          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(30)}`}
            buttonIcon={isPlay ? 'pause' : 'play'}
            onPress={() => setIsPlay(prevState => !prevState)}
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
