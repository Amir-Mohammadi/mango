import { useEffect } from 'react';

// Destructors are only allowed to return void.
type Destructor = () => void;

export const useOnUnmount = (destructor: Destructor): void => {
  useEffect(() => {
    return destructor;
  }, []);
};
