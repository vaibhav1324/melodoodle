import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { theme, withMotion } from 'utils';

import Landing from 'components/Landing';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Landing />
    </ChakraProvider>
  );
};

const AppWithMotion = withMotion(App);

export default AppWithMotion;
