import React from 'react';

import { ChakraComponent } from '@chakra-ui/react';

type CustomChakraComponent<T extends ChakraComponent<any, any>> = (
  moreProps: React.ComponentProps<T>,
) => React.ReactElement;

const styled = <T extends ChakraComponent<any, any>>(
  Component: T,
  props: React.ComponentProps<T>,
): CustomChakraComponent<T> => {
  const NewChakraComponent: CustomChakraComponent<T> = (moreProps) => {
    const combinedProps = {
      ...props,
      ...moreProps,
    };

    return <Component {...combinedProps} />;
  };

  return NewChakraComponent;
};

export default styled;
