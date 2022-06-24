//Node Modules imports
import React from 'react';
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

const buttonVariant = createVariant({themeKey: 'buttonVariants'});
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([buttonVariant], Box);

const restyleFunctions = [buttonVariant as any, backgroundColor];

type Props = VariantProps<Theme, 'textVariants', 'textVariants'> &
  AllProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> & {
    onPress: () => void;
    label: string;
  };

const Button = ({onPress, textVariants, ...rest}: Props) => {
  //States,props and hooks
  const props = useRestyle([restyleFunctions], rest);
  const {label} = rest;

  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer {...props}>
        <Text variant={textVariants}>{label}</Text>
      </ButtonContainer>
    </TouchableOpacity>
  );
};

export default Button;
