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
  alignSelf: 'center',
  fontSize: 20,
  color: 'white',
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

/**
 * A list of variant names.
 */
export type GradientButtonVariantNames = 'main';

export const viewVariants: Record<GradientButtonVariantNames, ViewStyle> = {
  /**
   * A smaller piece of secondary information.
   */
  main: { ...BASE_VIEW },

  /**
   * A button without extras.
   */
};

export const textVariants: Record<GradientButtonVariantNames, TextStyle> = {
  main: { ...BASE_TEXT, color: color.palette.white },
};
