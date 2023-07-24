import { useState } from 'react';

/**
 * The `useInitializer` function is a hook that returns the initial state value.
 * @param {T | (() => T)} initialState - The `initialState` parameter is the initial value that will be
 * used for the state. It can be of any type `T` or a function that returns a value of type `T`. If a
 * function is provided, it will be called only once to get the initial value.
 * @returns The value returned by the `useInitializer` function is the initial state value.
 */
const useInitializer = <T>(initialState: T | (() => T)) => {
  const [value] = useState(initialState);

  return value;
};

export default useInitializer;
