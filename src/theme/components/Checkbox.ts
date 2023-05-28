import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const gold = definePartsStyle({
  icon: defineStyle({
    bg: 'gold.neutral',
    borderColor: 'gold.neutral',
    color: 'primary.neutral',
  }),
  control: defineStyle({
    width: '24px',
    height: '24px',
    _checked: {
      bg: 'gold.neutral',
      borderColor: 'gold.neutral',
    },
  }),
});

const outline = definePartsStyle({
  icon: defineStyle({
    borderColor: 'primary.neutral',
    color: 'white',
  }),
  control: defineStyle({
    width: '24px',
    height: '24px',
    borderRadius: 'lg',
    _checked: {
      bg: 'primary.neutral',
      borderColor: 'primary.neutral',
    },
  }),
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { gold, outline },
  defaultProps: {
    variant: 'outline',
  },
});

export default checkboxTheme;
