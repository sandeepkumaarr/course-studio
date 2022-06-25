import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import Box from '../Box';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';

import Button from '../Button';
import Text from '../Text';

const DownloadsCard = () => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <Card flexDirection={'row'} alignItems="flex-end">
      <Box>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://picsum.photos/200',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Box>

      <Box flex={1} paddingHorizontal={5}>
        <Box flexDirection={'row'}>
          <Text variant="cardText" numberOfLines={3}>
            Good Inside Episode 4: What Should I Say When My Kid Is Afraid?
          </Text>
        </Box>

        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'space-between'}>
          <Box>
            <Progress.Bar
              progress={0.3}
              width={Math.round(moderateScale(140))}
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
    width: Math.round(moderateScale(150)),
    height: Math.round(moderateScale(130)),
    borderRadius: 20,
  },
});
