import { extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '26px',
    '3xl': '28px',
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  colors: {
    primary: {
      100: '#D0F8FA',
      200: '#A3F0F1',
      300: '#77E8E6',
      400: '#4AE0DB',
      500: '#1ED7D0',
      600: '#1AB9B7',
      700: '#159B9E',
      800: '#107C85',
      900: '#0B5E6C',
    },
    secondary: {
      100: '#FFECD1',
      200: '#FFD9A2',
      300: '#FFC673',
      400: '#FFB344',
      500: '#FFA015',
      600: '#E69013',
      700: '#CD8011',
      800: '#B4700F',
      900: '#9B600D',
    },
  },
  components: {
    Button: {
      baseStyle: {
        width: '132px',
        borderRadius: '8px',
      },
      sizes: {
        md: {
          width: '132px',
          height: '2.5rem',
          fontSize: '14px',
        },
        lg: {
          fontSize: '16px',
          height: '2.5rem',
          width: '300px',
        },
      },
      variants: {
        outline: {
          border: '2px solid',
        },
      },
      defaultProps: {
        variant: 'solid',
        colorScheme: 'primary',
      },
    },
  },
});
