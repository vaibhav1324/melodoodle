import { Box, Flex, Text } from '@chakra-ui/react';
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
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    delay: 0.5,
    duration: 1,
    ease: 'easeIn',
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
  shadow: 'md',
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
  shadow: 'md',
});

export const Title = chakraStyled(Text, {
  fontSize: '26px',
  textAlign: 'center',
  fontWeight: '600',
  textShadow: '2px 2px 5px #ccc',
});

export const BottomContainer = chakraStyled(Flex, {
  mt: '20px',
  gap: '10px',
  direction: 'column',
});

export const Note = chakraStyled(Text, {
  mt: '20px',
  fontSize: '14px',
  fontStyle: 'italic',
});

export const BallContainer = chakraStyled(Box, {
  p: '5px',
  mb: '20px',
  borderRadius: '80px',
  border: '5px solid red',
});

export const RecordingBall = chakraStyled(motion(Box) as any, {
  w: '50px',
  h: '50px',
  borderRadius: '50px',
  bg: 'red',
  animate: {
    scale: [0.7, 1, 0.7],
    opacity: [0.8, 1, 0.8],
  },
  transition: {
    repeat: Infinity,
    duration: 2,
  },
});
