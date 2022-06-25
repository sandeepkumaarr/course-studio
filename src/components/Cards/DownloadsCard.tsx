import {StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import Box from '../Box';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';

import Button from '../Button';
import Text from '../Text';

const {width} = Dimensions.get('window');

const DownloadsCard = () => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <Card flexDirection={'row'} alignItems="flex-end" variant={'downloads'}>
      <Card variant={'imageShadow'}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://picsum.photos/200',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Card>

      <Box flex={1} paddingHorizontal={5}>
        <Box flexDirection={'row'}>
          <Text variant="cardText" numberOfLines={3}>
            Good Inside Episode 4: What Should I Say When My Kid Is Afraid?
          </Text>
        </Box>

        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'space-between'}
          marginTop={5}>
          <Box>
            <Progress.Bar
              progress={0.3}
              color="#9deec4"
              unfilledColor="#e5e5e5"
              borderColor="#303030"
              width={Math.round(moderateScale(width / 3.2))}
            />
          </Box>

          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(30)}`}
            buttonIcon={isPlay ? 'download' : 'play'}
            onPress={() => setIsPlay(prevState => !prevState)}
            paddingRight={3}
            paddingBottom={2}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default DownloadsCard;

const styles = StyleSheet.create({
  image: {
    width: Math.round(moderateScale(140)),
    height: Math.round(moderateScale(120)),
    borderRadius: 20,
  },
});
