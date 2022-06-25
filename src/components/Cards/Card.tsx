import React from 'react';
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  backgroundColor,
  BackgroundColorProps,
  useRestyle,
  spacing,
  SpacingProps,
  LayoutProps,
} from '@shopify/restyle';
import {Theme} from '../../themes/default';
import Box from '../Box';

const CardVariant = createVariant({themeKey: 'cardVariants'});
const CardContainer = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([CardVariant], Box);

const restyleFunctions = [CardVariant as any, backgroundColor, spacing];

type CardProps = VariantProps<Theme, 'cardVariants'> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> & {
    children?: React.ReactNode;
  };

const Card = ({...rest}: CardProps) => {
  const props = useRestyle(restyleFunctions, rest);
  const {children} = rest;

  return <CardContainer {...props}>{children}</CardContainer>;
};

export default Card;
