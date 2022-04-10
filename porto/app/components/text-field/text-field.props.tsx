import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { TextFieldVariants } from './text-field.variants';

export interface TextFieldProps extends TextInputProps {
  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;
  /**
   * The label text if no labelTx is provided.
   */
  label?: string;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Various look & feels.
   */
  variant?: TextFieldVariants;

  forwardedRef?: any;
}
