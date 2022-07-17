import {showMessage} from 'react-native-flash-message';
import {moderateScale} from 'react-native-size-matters';
import {ErrorHandler} from '../types/commons';

export const showErrorMessage = ({bgColor, title, message}: ErrorHandler) => {
  showMessage({
    message: title,
    description: message,
    type: 'info',
    backgroundColor: bgColor,
    textStyle: {
      fontFamily: 'SFProText-Bold',
      color: '#FFFFFF',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(16),
    },
    titleStyle: {
      fontFamily: 'SFProText-Bold',
      color: '#FFFFFF',
      fontSize: moderateScale(24),
      lineHeight: moderateScale(32),
    },
    duration: 5000,
  });
};
