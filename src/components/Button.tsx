//Node Modules imports
import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  VariantProps,
  createVariant,
  createRestyleComponent,
  backgroundColor,
  useRestyle,
  AllProps,
} from '@shopify/restyle';

//File Imports
import {Theme} from '../themes/default';
import Box from './Box';
import Text from './Text';
import {SVGIcon, SVGTypes} from './SVGIcon';

const buttonVariant = createVariant({themeKey: 'buttonVariants'});
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([buttonVariant], Box);

const restyleFunctions = [buttonVariant as any, backgroundColor];

type ButtonProps = React.ComponentPropsWithRef<typeof TouchableOpacity> &
  VariantProps<Theme, 'textVariants', 'textVariants'> &
  AllProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> & {
    label?: string;
    showIcon?: boolean;
    buttonIcon?: SVGTypes;
    iconWidth?: string;
    iconHeight?: string;
  };

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({...rest}, ref) => {
    //Hooks and props
    const props = useRestyle([restyleFunctions], rest);
    const {
      label,
      textVariants,
      buttonIcon = 'google',
      iconWidth = '24',
      iconHeight = '24',
      showIcon = false,
    } = rest;

    //JSX logics
    return (
      <TouchableOpacity ref={ref} {...props}>
        <ButtonContainer {...props}>
          {showIcon ? (
            <SVGIcon type={buttonIcon} height={iconHeight} width={iconWidth} />
          ) : null}
          {label ? <Text variant={textVariants}>{label}</Text> : null}
        </ButtonContainer>
      </TouchableOpacity>
    );
  },
);

export default Button;
