import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {AuthenticationScreen} from '../screens/Index';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routes.AUTHENTICATION_SCREEN}>
      <Stack.Screen
        name={routes.AUTHENTICATION_SCREEN}
        component={AuthenticationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
