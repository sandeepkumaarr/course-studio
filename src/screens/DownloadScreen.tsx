import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {
  BottomTab,
  Box,
  DownloadsCard,
  MaximizedPlayer,
  MinimizedPlayer,
  Text,
} from '../components';
import {AudioContextInterface, AudioContext} from '../context/AudioContext';

const DownloadScreen = () => {
  const {handlePlayerModalPress} = useContext(
    AudioContext,
  ) as AudioContextInterface;

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingHorizontal={5} paddingVertical={5}>
        <Text variant={'header'}>Downloads</Text>
      </Box>
      <Box marginTop={5}>
        <DownloadsCard />
      </Box>
      <Box flex={1} position={'absolute'} bottom={0} width={'100%'}>
        <TouchableOpacity onPress={handlePlayerModalPress}>
          <MinimizedPlayer />
        </TouchableOpacity>
        <BottomTab />
      </Box>

      <MaximizedPlayer />
    </SafeAreaView>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
});
