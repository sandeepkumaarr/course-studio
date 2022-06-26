import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Box, DownloadsCard, Text} from '../components';

const DownloadScreen = () => {
  useEffect(() => {
    console.log('Download Screen loaded');

    return () => {
      null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingHorizontal={5} paddingVertical={5}>
        <Text variant={'header'}>Downloads</Text>
      </Box>
      <Box marginTop={5}>
        <DownloadsCard />
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
