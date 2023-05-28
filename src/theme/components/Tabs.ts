import { ComponentStyleConfig } from '@chakra-ui/react';

const Tabs: ComponentStyleConfig = {
  variants: {
    ['soft-rounded']: {
      ['tab']: {
        fontSize: '13px',
        color: '#F4F4FE',
        borderRadius: '5px',
        fontWeight: 'normal',
        py: 1,
        px: 4,
        _selected: {
          color: '#000000',
          backgroundColor: 'gold.neutral',
        },
      },
    },
  },
};

export default Tabs;
