import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: namedSpacing.tiny,
  alignSelf: 'flex-start',
};

const DIMENSIONS = { width: 16, height: 16 };

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.primaryDarker,
  borderRadius: 1,
};

const FILL: ViewStyle = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: color.primary,
};

/**
 * A list of checkbox variant names.
 */
export type CheckboxVariantNames = 'default';

export const rootVariants: Record<CheckboxVariantNames, ViewStyle> = {
  default: { ...ROOT },
};

export const fillVariants: Record<CheckboxVariantNames, ViewStyle> = {
  default: { ...FILL },
};

export const outlineVariants: Record<CheckboxVariantNames, TextStyle> = {
  default: { ...OUTLINE },
};
