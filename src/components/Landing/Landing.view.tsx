import React, { FC } from 'react';

import Carousel from './Carousel';

import { Container, Logo, ActionButton, Description } from './Landing.style';

const Landing: FC = () => {
  return (
    <Container direction={{ base: 'column', md: 'row' }} gap="100px">
      <Container p="0" align="center" gap="20px">
        <Logo />
        <Description>
          Welcome to MeloDoodle, where your melodies shape visuals! Press keys
          to create a tune, then watch as our AI transforms your unique sound
          into a vibrant geometric pattern. Start your symphony of shapes now!
        </Description>
        <ActionButton>Try it out</ActionButton>
      </Container>

      <Carousel />
    </Container>
  );
};

export default Landing;
