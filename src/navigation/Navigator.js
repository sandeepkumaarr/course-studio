import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, DownloadScreen} from '../screens/Index';
import routes from './routes';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.HOME_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={routes.DOWNLOAD_SCREEN} component={DownloadScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;