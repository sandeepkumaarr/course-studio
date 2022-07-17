import {StyleSheet, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import Card from './Card';
import Box from '../Box';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

import Button from '../Button';
import Text from '../Text';
import {EpisodeItems} from '../../types/home';
import {useDispatch, useSelector} from 'react-redux';
import {setMiniPlayerDetailsActionCreator} from '../../redux/reducers/AudioReducer';
import {State} from '../../types/commons';
import {AudioContextInterface, AudioContext} from '../../context/AudioContext';
import TrackPlayer from 'react-native-track-player';
import {downloadFile} from '../../utils/downloadFile';

dayjs.extend(customParseFormat);

const {width} = Dimensions.get('window');

type EpisodesCardProps = EpisodeItems & {
  isDownloads: boolean;
};

const EpisodesCard = ({...rest}: EpisodesCardProps) => {
  const {name, created_at, url, id, index, isDownloads = false} = rest;
  const currentPlayerId = useSelector(
    (state: State) => state.Audio?.currentPlayingCardId,
  );

  const {handlePlayerModalPress} = useContext(
    AudioContext,
  ) as AudioContextInterface;

  const dispatch = useDispatch();

  const SkipToPlayer = async () => {
    await TrackPlayer.skip(index);
  };

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
          <Box>
            <Text variant={'cardDate'} numberOfLines={1}>
              {dayjs(created_at, `YY/MM/DD, hh:mm`).format(`MMM D YYYY`)}
            </Text>
          </Box>

          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(30)}`}
            iconHeight={`${verticalScale(25)}`}
            buttonIcon={currentPlayerId == id ? 'pause' : 'play'}
            onPress={() => {
              if (currentPlayerId) {
                console.log('SkipToPlayer');

                SkipToPlayer();
              }
              dispatch(
                setMiniPlayerDetailsActionCreator({
                  url: url,
                  title: name,
                  currentPlayingCardId: id,
                  showMiniPlayer: true,
                  maxPlayerSize: ['1%', '2%'],
                }),
              );
              handlePlayerModalPress();
            }}
            paddingBottom={2}
            paddingRight={isDownloads ? 5 : 0}
          />

          {!isDownloads ? (
            <Button
              alignItems={'center'}
              showIcon
              iconWidth={`${scale(30)}`}
              iconHeight={`${verticalScale(30)}`}
              buttonIcon={'download'}
              paddingRight={3}
              paddingBottom={2}
              onPress={() => {
                downloadFile({
                  title: name,
                  ext: 'mp3',
                  downloadUrl: url,
                  mimeType: 'audio/mpeg',
                  created_at: created_at,
                  id: id,
                  index: index,
                });
              }}
            />
          ) : null}
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
