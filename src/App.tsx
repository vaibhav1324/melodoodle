import React from 'react';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import { theme, withMotion } from 'utils';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex>HELLOOOO</Flex>
    </ChakraProvider>
  );
};

const AppWithMotion = withMotion(App);

export default AppWithMotion;
