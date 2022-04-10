import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';


export const Loader = () => {
  return (
    <Center flex="1">
      <Spinner />
    </Center>
  );
};
