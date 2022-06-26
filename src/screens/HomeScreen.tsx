import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {
  BottomTab,
  Box,
  Button,
  EpisodesCard,
  MaximizedPlayer,
  MinimizedPlayer,
  Text,
} from '../components';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Popover, usePopover} from 'react-native-modal-popover';

import {setUserDetailsActionCreator} from '../redux/reducers/userReducer';
import FastImage from 'react-native-fast-image';
import {State} from '../types/commons';
import {AudioContextInterface, AudioContext} from '../context/AudioContext';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: State) => state.User?.userDetails);
  const {handlePlayerModalPress} = useContext(
    AudioContext,
  ) as AudioContextInterface;

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

      <Box marginTop={10}>
        <ScrollView>
          <EpisodesCard />
          <EpisodesCard />
          <EpisodesCard />
          <EpisodesCard />
          <EpisodesCard />
        </ScrollView>
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
