import React, { FC, useEffect, useState } from 'react';

import Lottie from 'lottie-react';

import { Container, LottieContainer, lottieProps } from './Landing.style';

const ASSETS = [
  require('assets/animation1.json'),
  require('assets/animation2.json'),
  require('assets/animation3.json'),
  require('assets/animation4.json'),
];

const Carousel: FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % ASSETS.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container
      direction="row"
      gap="20px"
      overflow="hidden"
      maxW={{ base: '90vw', md: '50vw' }}>
      {ASSETS.map(
        (asset, index) =>
          index === currentImage && (
            <LottieContainer>
              <Lottie {...lottieProps} animationData={asset} />
            </LottieContainer>
          ),
      )}
    </Container>
  );
};

export default Carousel;
