import { useLayoutContext } from '@/app/layout';
import { useEffect } from 'react';


export const useFocusMode = (enabled = true) => {
  const ctx = useLayoutContext();
  const { setIsFocusMode } = ctx || {};

  useEffect(() => {
    if (!ctx) return () => undefined;
    setIsFocusMode(enabled);
    return () => setIsFocusMode(false);
  }, [ctx, setIsFocusMode, enabled]);
};
