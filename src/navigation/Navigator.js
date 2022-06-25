import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  DownloadScreen,
  AuthenticationScreen,
} from '../screens/Index';
import routes from './routes';
import {State} from '../types/commons';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const userDetails = useSelector((state: State) => state.User?.userDetails);

  return (
    <Stack.Navigator
      initialRouteName={routes.HOME_SCREEN}
      screenOptions={{headerShown: false}}>
      {!userDetails?.id ? (
        <Stack.Screen
          name={routes.AUTHENTICATION_SCREEN}
          component={AuthenticationScreen}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      )}

      <Stack.Screen name={routes.DOWNLOAD_SCREEN} component={DownloadScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
