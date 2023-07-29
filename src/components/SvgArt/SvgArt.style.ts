import { Text } from '@chakra-ui/react';

import { chakraStyled } from 'utils';

export const Title = chakraStyled(Text, {
  mb: '30px',
  fontSize: '26px',
  textAlign: 'center',
  fontWeight: '600',
  textShadow: '2px 2px 5px #ccc',
});
