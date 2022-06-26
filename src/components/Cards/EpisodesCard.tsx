import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Card from './Card';
import Box from '../Box';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

import Button from '../Button';
import Text from '../Text';
import {EpisodeItems} from '../../types/home';

dayjs.extend(customParseFormat);

const {width} = Dimensions.get('window');

const EpisodesCard = ({...rest}: EpisodeItems) => {
  const {name, created_at} = rest;

  return (
    <Card
      flexDirection={'row'}
      alignItems="flex-end"
      variant={'episodes'}
      marginTop={5}>
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
        <Box
          flexDirection={'row'}
          width={Math.round(moderateScale(width / 2.4))}>
          <Text variant="cardText" numberOfLines={3}>
            {name}
          </Text>
        </Box>

        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'space-between'}
          marginTop={3}>
          <Box paddingLeft={3}>
            <Text variant={'cardDate'} numberOfLines={1}>
              {dayjs(created_at, `YY/MM/DD, hh:mm`).format(`MMM D YYYY`)}
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
