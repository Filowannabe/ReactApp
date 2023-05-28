import { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      rounded: '3xl',
      backgroundColor: 'gold.neutral',
      color: '#210F42',
      _hover: {
        backgroundColor: 'gold.light',
      },
    },
  },
};

export default Button;
