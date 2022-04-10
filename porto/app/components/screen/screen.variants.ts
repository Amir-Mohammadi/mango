import { ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = 'none' | 'small';

/**
 * All screen keyboard offsets.
 */
export const offsets: Record<KeyboardOffsets, number> = {
  none: 0,
  small: namedSpacing.small,
};

/**
 * The variations of screens.
 */
export type ScreenVariants = 'fixed' | 'scroll' | 'scrollView';

/**
 * All the variations of screens.
 */
export const outerVariants: Record<ScreenVariants, ViewStyle> = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    backgroundColor: color.background,
    flex: 1,
    height: '100%',
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    backgroundColor: color.background,
    flex: 1,
    height: '100%',
  },

  /**
   * Scrolls. Suitable for forms with scroll.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scrollView: {
    backgroundColor: color.background,
    flex: 1,
  },
};

export const innerVariants: Record<ScreenVariants, ViewStyle> = {
  fixed: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
  },

  scroll: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  scrollView: { justifyContent: 'flex-start', alignItems: 'stretch' },
};

/**
 * Is this variant a non-scrolling one?
 *
 * @param variant The variant to check
 */
export function isNonScrolling(variant: ScreenVariants): boolean {
  // any of these things will make you scroll
  return variant === 'fixed';
}
