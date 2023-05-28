import { ComponentStyleConfig } from '@chakra-ui/react';

export const Input: ComponentStyleConfig = {
  variants: {
    filled: {
      field: {
        backgroundColor: 'white',
        color: 'neutral.black',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(145, 158, 171, 0.32)',
        borderRadius: '8px',
        height: '37px',
        _hover: {
          backgroundColor: 'white',
        },
        _focus: {
          backgroundColor: 'white',
        },
      },
    },
  },
  defaultProps: {
    variant: 'filled',
  },
};

export default Input;
