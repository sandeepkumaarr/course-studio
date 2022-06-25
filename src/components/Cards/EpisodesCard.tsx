import {StyleSheet} from 'react-native';
import React from 'react';
import Card from './Card';
import Box from '../Box';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

import Button from '../Button';
import Text from '../Text';

dayjs.extend(customParseFormat);

const EpisodesCard = () => {
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
          <Box paddingLeft={3}>
            <Text variant={'cardDate'} numberOfLines={1}>
              {dayjs('2022-06-21T18:38:48+00:00', `YY/MM/DD, hh:mm`).format(
                `MMM D YYYY`,
              )}
            </Text>
          </Box>

          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(30)}`}
            buttonIcon={'download'}
            paddingRight={3}
            paddingBottom={2}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default EpisodesCard;

const styles = StyleSheet.create({
  image: {
    width: Math.round(moderateScale(150)),
    height: Math.round(moderateScale(130)),
    borderRadius: 20,
  },
});
