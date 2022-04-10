import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing, typography } from '../../theme';

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: namedSpacing.small,
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
};

export type TextFieldVariants = 'default';

export const containerVariants: Record<TextFieldVariants, ViewStyle> = {
  default: {
    ...CONTAINER,
  },
};

export const inputVariants = {
  default: {
    ...INPUT,
  },
};
