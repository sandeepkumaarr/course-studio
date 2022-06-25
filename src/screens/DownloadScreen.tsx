import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTab, Box, DownloadsCard, MinimizedPlayer} from '../components';

const DownloadScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Box marginTop={5}>
        <DownloadsCard />
      </Box>
      <Box flex={1} position={'absolute'} bottom={0} width={'100%'}>
        <MinimizedPlayer />
        <BottomTab />
      </Box>
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
