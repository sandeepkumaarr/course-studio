import {StyleSheet} from 'react-native';
import React from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {scale, verticalScale} from 'react-native-size-matters';

import {Box, Button, Text} from '../components/index';
import {SVGIcon} from '../components/SVGIcon';

GoogleSignin.configure({
  webClientId:
    '399246441840-dhdppbb025ijcogm8he1dicg4uv8p9e5.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId:
    '399246441840-mm24ilssvb33kivb5gs9a7rk169qmofm.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const AuthenticationScreen = () => {
  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <Box
      flex={1}
      justifyContent={'space-around'}
      backgroundColor="authBackground">
      <Box alignItems={'center'} flex={4} justifyContent="center">
        <Box marginBottom={12}>
          <Text variant={'logoText'}>Course Studio Podcast</Text>
        </Box>

        <Box>
          <SVGIcon
            type={'logo'}
            height={`${verticalScale(100)}`}
            width={`${scale(100)}`}
          />
        </Box>
      </Box>

      <Box
        flex={3}
        alignItems={'center'}
        backgroundColor="secondary"
        justifyContent={'center'}>
        <Button
          showIcon
          label={'Continue with Google'}
          backgroundColor={'buttonBackground'}
          variant="google"
          marginHorizontal={5}
          textVariants="google"
          iconWidth={`${scale(24)}`}
          iconHeight={`${verticalScale(24)}`}
          onPress={() => onGoogleButtonPress()}
        />
      </Box>
    </Box>
  );
};

export default AuthenticationScreen;
