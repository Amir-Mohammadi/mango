import { EffectCallback, useEffect } from 'react';

/**
 * only runs first time
 * @param effect Imperative function that can return a cleanup function
 */
export const useOnMount = (effect: EffectCallback): void => {
  useEffect(effect, []);
};
