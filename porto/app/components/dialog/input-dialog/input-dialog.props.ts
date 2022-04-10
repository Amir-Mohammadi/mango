import { KeyboardTypeOptions } from 'react-native';
import { ValidationType } from '../../validation-input/validation-input';

export interface InputDialogProps {
  /**
   * is visible
   */
  isVisible: boolean;

  /**
   * title
   */
  title?: string;

  /**
   * message
   */
  message?: string;

  /**
   * initialValue
   */
  initialValue?: string;

  /**
   * placeholder
   */
  placeholder?: string;
  /**
   * validationType
   */
  validationType?: ValidationType[];

  /**
   * type for secure input
   */
  secureTextEntry: boolean;

  /**
   * onSubmit Function
   */
  onSubmit?: (value: string) => void;

  /**
   * onDismiss Function
   */
  onDismiss?: () => void;

  /**
   * onCancel Function
   */
  onCancel?: () => void;

  keyboardType?: KeyboardTypeOptions;
}
