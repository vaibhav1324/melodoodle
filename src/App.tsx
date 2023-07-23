import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { theme, withMotion } from 'utils';

import Landing from 'components/Landing';
import Keyboard from 'components/Keyboard';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Keyboard />
    </ChakraProvider>
  );
};

const AppWithMotion = withMotion(App);

export default AppWithMotion;
