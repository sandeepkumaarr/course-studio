import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {StatusBar, LogBox, ActivityIndicator} from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import Navigator from './src/navigation/Navigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import theme from './src/themes/default';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetailsActionCreator} from './src/redux/reducers/userReducer';
import {State} from './src/types/commons';

LogBox.ignoreAllLogs();

const STORYBOOK_START = false;

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: State) => state.User?.userDetails);

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
      <ThemeProvider theme={theme}>
        {!userDetails?.id ? <AuthNavigator /> : <Navigator />}
      </ThemeProvider>
    </>
  );
};

export default STORYBOOK_START ? require('./storybook').default : App;
