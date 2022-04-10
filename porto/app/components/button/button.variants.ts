import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const BASE_VIEW: ViewStyle = {
  paddingVertical: namedSpacing.small,
  paddingHorizontal: namedSpacing.small,
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
};

/**
 * All text will start off looking like this.
 */
const BASE_TEXT: TextStyle = {
  paddingHorizontal: namedSpacing.medium,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

/**
 * A list of variant names.
 */
export type ButtonVariantNames = 'primary' | 'link';

export const viewVariants: Record<ButtonVariantNames, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.orange },

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  },
};

export const textVariants: Record<ButtonVariantNames, TextStyle> = {
  primary: { ...BASE_TEXT, fontSize: 9, color: color.palette.white },
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
};
