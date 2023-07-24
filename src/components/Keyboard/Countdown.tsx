import React, { FC, useEffect, useState } from 'react';

import { Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';

const MotionText = motion(Text);

const Countdown: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((_count) => _count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <MotionText mb="20px" layout fontSize="26px" fontWeight="bold">
      {count}s
    </MotionText>
  );
};

export default Countdown;
