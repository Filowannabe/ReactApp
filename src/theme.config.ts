import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { extendTheme } from '@chakra-ui/react';
import components from './theme/components';
import { colors, fontWeights, fonts, sizes, textStyles } from './theme/overrides';

export default extendTheme({ colors, sizes, fonts, textStyles, fontWeights, components });
