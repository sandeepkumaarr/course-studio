import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Button} from '../components';
import {scale, verticalScale} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUserDetailsActionCreator} from '../redux/reducers/userReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => dispatch(setUserDetailsActionCreator(null)));
  };

  return (
    <Box flex={1} alignItems={'center'} justifyContent="center">
      <Button
        showIcon
        label={'Continue with Google'}
        backgroundColor={'primary'}
        variant="google"
        marginHorizontal={5}
        textVariants="google"
        iconWidth={`${scale(24)}`}
        iconHeight={`${verticalScale(24)}`}
        onPress={logout}
      />
    </Box>
  );
};

export default HomeScreen;
