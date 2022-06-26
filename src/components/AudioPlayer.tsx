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

const setUpPlayer = async (
  url: string | number | null,
  title: {toString: () => any},
) => {
  if (url) {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      await TrackPlayer.destroy();
    }

    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });

    await TrackPlayer.add({
      id: uuid().toString(),
      url: url ? url : '',
      title: title.toString(),
      artist: uuid().toString(),
      artwork: 'https://picsum.photos/200',
    });
  } else {
    await TrackPlayer.destroy();
  }
};

const togglePlayBack = async (
  playbackState: State,
  url: string | number | null,
  name: {toString: () => any},
  progress: {duration: any; position: any},
) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      if (progress.duration === progress.position) {
        setUpPlayer(url, name);
      }
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
  const {position, buffered, duration} = useProgress();

  const name = useSelector((state: AppState.State) => state.Audio?.title);
  const url = useSelector((state: AppState.State) => state.Audio?.url);

  useEffect(() => {
    setUpPlayer(url, name);

    return () => {
      null;
    };
  }, [url]);

  useEffect(() => {
    if (playbackState === State.Ready) {
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
            onPress={() =>
              togglePlayBack(playbackState, url, name, {
                duration: duration,
                position: position,
              })
            }
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
