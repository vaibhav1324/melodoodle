import { IconButton } from '@chakra-ui/react';

import { chakraStyled } from 'utils';

export const Button = chakraStyled(IconButton, {
  w: '55px',
  h: '55px',
  size: 'lg',
  right: '20px',
  bottom: '20px',
  isRound: true,
  position: 'fixed',
  colorScheme: 'blackAlpha',
  'aria-label': 'github-icon-button',
});
