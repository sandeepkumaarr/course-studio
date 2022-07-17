import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Box, Button, EpisodesCard, Text} from '../components';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Popover, usePopover} from 'react-native-modal-popover';

import {setUserDetailsActionCreator} from '../redux/reducers/userReducer';
import FastImage from 'react-native-fast-image';
import {State} from '../types/commons';
import {getEpisodes} from '../redux/actions/HomeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: State) => state.User?.userDetails);
  const episodesList = useSelector((state: State) => state.Home?.EpisodeList);
  const episodesListLoading = useSelector(
    (state: State) => state.Home?.EpisodesLoading,
  );

  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => dispatch(setUserDetailsActionCreator(null)));
  };

  useEffect(() => {
    console.log('Home Screen loaded');
    dispatch(getEpisodes({}));

    return () => {
      null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Box
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
        paddingHorizontal={10}
        marginTop={2}>
        <Text variant={'header'}>All Episodes</Text>

        <TouchableOpacity ref={touchableRef} onPress={openPopover}>
          <FastImage
            style={{
              width: Math.round(moderateScale(50)),
              height: Math.round(moderateScale(50)),
              borderRadius: 50,
            }}
            source={{
              uri: userDetails?.photoURL
                ? userDetails?.photoURL
                : 'https://i.ibb.co/k9XzrMJ/pngtree-user-avatar-placeholder-black-png-image-3918427-removebg-preview.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <Popover
          contentStyle={styles.content}
          backgroundStyle={styles.background}
          visible={popoverVisible}
          onClose={closePopover}
          fromRect={popoverAnchorRect}
          supportedOrientations={['portrait']}
          placement="bottom">
          <Button
            label={'Logout'}
            backgroundColor={'primary'}
            variant="logout"
            marginHorizontal={5}
            textVariants="google"
            iconWidth={`${scale(24)}`}
            iconHeight={`${verticalScale(24)}`}
            onPress={logout}
          />
        </Popover>
      </Box>

      <Box flex={1} marginTop={10}>
        {episodesListLoading ? (
          <Box alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator size="large" color={'#186eb7'} />
          </Box>
        ) : (
          <FlatList
            data={episodesList}
            renderItem={({item}) => (
              <EpisodesCard
                created_at={item.created_at}
                id={item.id}
                name={item.name}
                url={item.url}
                index={item.index}
                isDownloads={false}
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
            ListEmptyComponent={() =>
              !episodesListLoading ? (
                <Box
                  paddingVertical={10}
                  alignItems="center"
                  justifyContent={'center'}>
                  <Text variant={'header'}>No Episodes Found</Text>
                </Box>
              ) : null
            }
          />
        )}
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },

  content: {
    backgroundColor: 'transparent',
    borderRadius: 8,
  },

  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
