import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const video = definePartsStyle({
  container: {
    height: '2px',
  },
  track: {
    bg: 'neutral.purple',
    _checked: {
      bg: 'primary.neutral',
    },
  },
});

export default defineMultiStyleConfig({ variants: { video } });
