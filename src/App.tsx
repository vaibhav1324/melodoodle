import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';

import { theme, withMotion } from 'utils';

import Landing from 'components/Landing';
import Keyboard from 'components/Keyboard';

const App: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        {index === 0 && <Landing onStartPress={() => setIndex(1)} />}
        {index === 1 && <Keyboard />}
      </AnimatePresence>
    </ChakraProvider>
  );
};

const AppWithMotion = withMotion(App);

export default AppWithMotion;
