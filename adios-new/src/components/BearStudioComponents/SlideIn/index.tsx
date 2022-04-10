import { SlideFade, SlideFadeProps } from '@chakra-ui/react';
import React from 'react';


/**
 * On Of The Chakra Transition Components
 */
export const SlideIn: React.FC<SlideFadeProps> = ({ children, ...rest }) => {
  return (
    <SlideFade
      in
      offsetY={-20}
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      {...rest}
    >
      {children}
    </SlideFade>
  );
};
