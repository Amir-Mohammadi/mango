import { useTheme } from '@chakra-ui/react';
import { useCallback } from 'react';


export const useRtl = () => {
  const { direction } = useTheme();

  const rtlValue = useCallback(
    <T>(ltr: T, rtl: T) => (direction === 'rtl' ? rtl : ltr),
    [direction]
  );

  return {
    direction,
    rtlValue,
  };
};
