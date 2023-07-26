import React, { useRef, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';

import { theme, withMotion } from 'utils';

import SvgArt from 'components/SvgArt';
import Landing from 'components/Landing';
import Keyboard from 'components/Keyboard';

import { NotesPlayed } from 'types/common';

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const notesPlayedRef = useRef<NotesPlayed>([]);

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        {index === 0 && <Landing onStartPress={() => setIndex(1)} />}
        {index === 1 && (
          <Keyboard
            onCreateArt={(_notesPlayed) => {
              notesPlayedRef.current = _notesPlayed;

              setIndex(2);
            }}
          />
        )}
        {index === 2 && <SvgArt notesPlayed={notesPlayedRef.current} />}
      </AnimatePresence>
    </ChakraProvider>
  );
};

const AppWithMotion = withMotion(App);

export default AppWithMotion;
