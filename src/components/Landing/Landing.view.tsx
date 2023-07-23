import React, { FC } from 'react';

import { withMotion } from 'utils';

import Carousel from './Carousel';

import {
  Logo,
  Container,
  Description,
  ActionButton,
  AnimationConfig,
} from './Landing.style';

import { LandingProps } from './Landing.props';

const Landing: FC<LandingProps> = ({ onStartPress }) => {
  return (
    <Container direction={{ base: 'column', md: 'row' }} gap="100px">
      <Container p="0" align="center" gap="20px">
        <Logo />
        <Description>
          Welcome to MeloDoodle, where your melodies shape visuals! Press keys
          to create a tune, then watch as our AI transforms your unique sound
          into a vibrant geometric pattern. Start your symphony of shapes now!
        </Description>
        <ActionButton onClick={onStartPress}>Try it out</ActionButton>
      </Container>

      <Carousel />
    </Container>
  );
};

export default withMotion(Landing, AnimationConfig);
