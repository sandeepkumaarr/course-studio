import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  LogBox,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Navigator from './src/navigation/Navigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

import theme from './src/themes/default';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetailsActionCreator} from './src/redux/reducers/userReducer';
import {State} from './src/types/commons';
import {
  BottomTab,
  Box,
  MaximizedPlayer,
  MinimizedPlayer,
} from './src/components';
import {setMaxPlayerSizeActionCreator} from './src/redux/reducers/AudioReducer';

// import {NativeModules} from 'react-native';
// NativeModules.DevSettings.setIsDebuggingRemotely(false);

LogBox.ignoreAllLogs();

const STORYBOOK_START = false;

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  const showMiniPlayer = useSelector(
    (state: State) => state.Audio?.showMiniPlayer,
  );

  const UserDetails = useSelector((state: State) => state.User?.userDetails);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    dispatch(
      setUserDetailsActionCreator({
        id: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      }),
    );
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState =>
      onAuthStateChanged(userState),
    );
    return subscriber;
  }, []);

  if (initializing) return <ActivityIndicator size="large" />;

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider theme={theme}>
          <Navigator />
          {UserDetails?.id ? (
            <>
              <Box flex={1} position={'absolute'} bottom={0} width={'100%'}>
                {showMiniPlayer ? (
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(setMaxPlayerSizeActionCreator(['50%', '95%']))
                    }>
                    <MinimizedPlayer />
                  </TouchableOpacity>
                ) : null}
                <BottomTab />
              </Box>

              <MaximizedPlayer />
            </>
          ) : null}
          <FlashMessage position="top" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default STORYBOOK_START ? require('./storybook').default : App;
