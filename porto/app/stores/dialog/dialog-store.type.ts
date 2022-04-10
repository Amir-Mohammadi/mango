import { KeyboardTypeOptions } from 'react-native';
import { ValidationType } from '../../components/validation-input/validation-input';

export enum DialogType {
  alert = 0,
  question = 1,
  input = 3,
}

export type AlertDialogOption = {
  title?: string;
  message: string;
  dismissLock?: boolean;
  onDismiss?: () => void;
  onSubmit?: () => void;
};

export type QuestionDialogOption = {
  title?: string;
  message: string;
  dismissLock?: boolean;
  onDismiss?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export type InputDialogOption = {
  title?: string;
  message?: string;
  keyboardType?: KeyboardTypeOptions;
  dismissLock?: boolean;
  validationType: ValidationType[];
  inputInitialValue?: string;
  inputPlaceHolder?: string;
  inputSecureTextEntry?: boolean;
  onDismiss?: () => void;
  onSubmit?: (inputValue: string) => void;
  onCancel?: () => void;
};
