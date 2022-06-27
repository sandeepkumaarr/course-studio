import {Dimensions} from 'react-native';
import React, {useEffect} from 'react';

import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {v4 as uuid} from 'uuid';
import Box from './Box';
import Button from './Button';
import {scale, verticalScale} from 'react-native-size-matters';
import Text from './Text';
import {useSelector} from 'react-redux';
import * as AppState from '../types/commons';
import {EpisodeItems} from '../types/home';

type trackProps = {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
};

const setUpPlayer = async (musicList: EpisodeItems[]) => {
  let ModifiedMusicList: Array<trackProps> = [];

  Promise.all(
    musicList.map(item => {
      ModifiedMusicList.push({
        id: uuid().toString(),
        url: item.url ? item.url : '',
        title: item.name.toString(),
        artist: uuid().toString(),
        artwork: 'https://picsum.photos/200',
      });
    }),
  );

  if (ModifiedMusicList.length > 0) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      stopWithApp: true,
    });

    await TrackPlayer.add(ModifiedMusicList);
  } else {
    await TrackPlayer.destroy();
  }
};

const togglePlayBack = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      console.log('Continuing to play audio');

      await TrackPlayer.play();
    } else {
      console.log('Pausing Audio');

      await TrackPlayer.pause();
    }
  }
};

const playOnMount = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    console.log('Playing audio now');
    await TrackPlayer.play();
  }
};

const {width} = Dimensions.get('window');

type AudioPlayerProps = {
  showSlider?: boolean;
  showDuration?: boolean;
  playerIconWidth?: number;
  playerIconHeight?: number;
};

const AudioPlayer = ({...rest}: AudioPlayerProps) => {
  const {
    showSlider = true,
    showDuration = true,
    playerIconWidth = 100,
    playerIconHeight = 100,
  } = rest;
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();

  const musicList = useSelector(
    (state: AppState.State) => state.Home?.EpisodeList,
  );

  useEffect(() => {
    if (showSlider) {
      console.log('Setting Up Player');

      setUpPlayer(musicList);
    }

    return () => {
      null;
    };
  }, []);

  useEffect(() => {
    if (playbackState === State.Ready) {
      console.log('Playing Audio on mount');
      playOnMount();
    }
    return () => {
      null;
    };
  }, [playbackState]);

  return (
    <Box>
      {showSlider ? (
        <Box alignItems={'center'} marginTop={10}>
          <Slider
            style={{width: width - 50, height: 40}}
            minimumTrackTintColor="#9deec4"
            maximumTrackTintColor="#303030"
            value={position}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={async value => {
              console.log('seeking Audio to value: ', value);
              await TrackPlayer.seekTo(value);
            }}
          />
        </Box>
      ) : null}
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-around'}
        marginTop={5}>
        {showDuration ? (
          <Box>
            <Text variant={'maxPlayerTime'}>
              {new Date(position * 1000).toISOString().substr(14, 5)}
            </Text>
          </Box>
        ) : null}

        <Box>
          <Button
            alignItems={'center'}
            showIcon
            iconWidth={`${scale(playerIconWidth)}`}
            iconHeight={`${verticalScale(playerIconHeight)}`}
            buttonIcon={playbackState === State.Playing ? 'pause' : 'play'}
            onPress={() => togglePlayBack(playbackState)}
          />
        </Box>

        {showDuration ? (
          <Box>
            <Text variant={'maxPlayerTime'}>
              {new Date((duration - position) * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default AudioPlayer;
