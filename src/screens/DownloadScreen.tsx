import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTab, Box} from '../components';

const DownloadScreen = () => {
  return (
    <Box flex={1}>
      <Box flex={1} position={'absolute'} bottom={0} width={'100%'}>
        <BottomTab />
      </Box>
    </Box>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({});
