import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { chakraStyled } from 'utils';

import logo from 'assets/logo.png';
import { motion } from 'framer-motion';

export const Container = chakraStyled(Flex, {
  p: {
    base: '20px',
    md: '100px',
  },
  flex: 1,
  justify: 'center',
  direction: 'column',
});

export const Logo = chakraStyled(Image, {
  src: logo,
  w: {
    base: '200px',
    md: '500px',
  },
  h: 'auto',
  aspectRatio: 1.5,
  objectFit: 'contain',
  bg: 'transparent',
  draggable: false,
});

export const Description = chakraStyled(Text, {
  fontSize: '16px',
  fontWeight: '500',
  maxW: '500px',
  letterSpacing: '2.5px',
  textAlign: 'center',
  userSelect: 'none',
});

export const ActionButton = chakraStyled(Button, {
  mt: '20px',
  w: '220px',
  alignSelf: 'center',
});

export const lottieProps = {
  loop: true,
  autoPlay: true,
  style: {
    maxHeight: '50vh',
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

export const LottieContainer = chakraStyled(motion(Flex) as any, {
  variants: fadeIn,
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
});

export const AnimationConfig = {
  initial: {
    x: '-90vw',
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
    type: 'tween',
  },
};
