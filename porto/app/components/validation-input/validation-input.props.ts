import { InputProps } from 'react-native-elements';
import { ValidationType } from './validation-input';

export interface ValidationInputProps extends InputProps {
  /**
   * initial value (this is used when want to edit form)
   */
  initialValue?: string;
  /**
   * initial is valid (this is used when want to edit form)
   */
  initialIsValid?: boolean;

  /**
   * identifier (pass this props to component to return main handle change)
   */
  identifier?: string;
  /**
   * inputChange function
   */
  onInputChange?: any;

  /**
   * inputChange function
   */
  validationTypes: Array<ValidationType>;

  /**
   * inputChange function
   */
  errorShow?: boolean;
  /**
   * min number
   */
  min?: number;

  /**
   * max number
   */
  max?: number;

  /**
   * max number
   */
  minLength?: number;
}
