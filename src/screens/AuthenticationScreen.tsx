import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '399246441840-dhdppbb025ijcogm8he1dicg4uv8p9e5.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId:
    '399246441840-mm24ilssvb33kivb5gs9a7rk169qmofm.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const AuthenticationScreen = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          marginTop: 200,
        }}
        onPress={() => onGoogleButtonPress().then(data => console.log(data))}>
        <Text>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({});
