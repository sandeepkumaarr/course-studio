import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, DownloadsCard, EpisodesCard, Text} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AudioFileInfo} from '../types/home';
import {moderateVerticalScale} from 'react-native-size-matters';

const DownloadScreen = () => {
  const [dowloadedEpisodes, setdowloadedEpisodes] = useState<
    Array<AudioFileInfo>
  >([]);

  const getMultipleData = async () => {
    try {
      let result: Array<AudioFileInfo> = [];
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const val = await AsyncStorage.getItem(key);
        if (val) result.push(JSON.parse(val));
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Download Screen loaded');
    getMultipleData().then(res => {
      if (res) setdowloadedEpisodes(res);
    });
    return () => {
      null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingHorizontal={5} paddingVertical={5}>
        <Text variant={'header'}>Downloads</Text>
      </Box>
      <Box flex={1} marginTop={10}>
        <FlatList
          data={dowloadedEpisodes}
          renderItem={({item}) => (
            <EpisodesCard
              created_at={item.created_at}
              id={item.id}
              name={item.name}
              url={item.localFilePath}
              index={item.index}
              isDownloads={true}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => (
            <View
              style={{
                marginBottom: Math.round(moderateVerticalScale(200)),
              }}
            />
          )}
        />
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
