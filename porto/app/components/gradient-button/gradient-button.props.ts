import {
    StyleProp,
    TextStyle,

    ViewStyle
} from 'react-native';
import { ButtonProps } from 'react-native-elements';
import { GradientButtonVariantNames } from './gradient-button.variants';

export interface GradientButtonProps extends ButtonProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of button variant.
   */

  variant?: GradientButtonVariantNames;

  children?: React.ReactNode;

  colors?: [string, string];

  start?: { x: number; y: number };

  end?: { x: number; y: number };
}
