import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { chakraStyled } from 'utils';

export const Container = chakraStyled(Flex, {
  p: {
    base: '20px',
    md: '100px',
  },
  flex: 1,
  justify: 'center',
  position: 'relative',
  align: 'center',
});

export const AnimationConfig = {
  initial: {
    x: '90vw',
    opacity: 0,
    scale: 0.2,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: '-90vw',
    opacity: 0,
    scale: 0.2,
  },
  transition: {
    delay: 0.5,
    duration: 1.5,
    type: 'spring',
  },
};

const variants = {
  pressed: { scale: 0.95, y: '1px', z: -10 }, // This slightly shrinks the key and moves it down
  notPressed: { scale: 1, y: '0px', z: 0 }, // This returns the key to its original state
};

export const WhiteKey = chakraStyled(motion(Box) as any, {
  as: 'button',
  bg: '#fff',
  w: '50px',
  h: '200px',
  border: '1px solid black',
  cursor: 'pointer',
  borderBottomRadius: '10px',
  variants,
  initial: 'notPressed',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  textTransform: 'uppercase',
});

export const BlackKey = chakraStyled(motion(Box) as any, {
  as: 'button',
  bg: '#000',
  w: '30px',
  h: '120px',
  zIndex: 1,
  color: '#fff',
  cursor: 'pointer',
  borderBottomRadius: '10px',
  position: 'absolute',
  variants,
  initial: 'notPressed',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  textTransform: 'uppercase',
});
