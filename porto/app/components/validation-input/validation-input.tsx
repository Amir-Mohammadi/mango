import React, { useEffect, useReducer } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import toEnglishDigits from '../../utils/number-to-english-convertor';
import {
    emailValidation,
    phoneValidationArchive,
    requiredValidation
} from '../../utils/validation-functions';
import { ValidationInputProps } from './validation-input.props';

export enum ValidationType {
  required,
  email,
  phone,
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        validationMessage: action.validationMessage,
      };
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }
    default:
      return state;
  }
};

export interface ValidationResult {
  isValid: boolean;
  validationMessage: string;
}
const ValidationInput: React.FC<ValidationInputProps> = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialIsValid ? props.initialIsValid : false,
    validationMessage: '',
    touched: false,
  });

  const { onInputChange, identifier, validationTypes } = props;

  useEffect(() => {
    focusHandler();
  }, []);

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(
        identifier,
        inputState.value,
        inputState.isValid,
        inputState.validationMessage,
      );
    }
  }, [inputState, onInputChange, identifier]);

  const textChangeHandler = text => {
    validateHandler(toEnglishDigits(text));
  };

  function validateHandler(value: string) {
    let result: ValidationResult = { isValid: false, validationMessage: '' };
    for (let i = 0; i < validationTypes.length; i++) {
      result = validate(value, validationTypes[i]);
      if (!result.isValid) {
        break;
      }
    }

    if (validationTypes.length === 0) {
      result.isValid = true;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: value,
      isValid: result.isValid,
      validationMessage: result.validationMessage,
    });
  }
  function validate(
    value: string,
    validationType: ValidationType,
  ): ValidationResult {
    let result: ValidationResult = { isValid: false, validationMessage: '' };
    switch (validationType) {
      case ValidationType.required:
        result = requiredValidation(value);
        break;
      case ValidationType.email:
        result = emailValidation(value);
        break;
      case ValidationType.phone:
        result = phoneValidationArchive(value);
        break;
    }
    return result;
  }
  const focusHandler = () => {
    validateHandler(inputState.value);
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <View>
      <Input
        {...props}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onFocus={focusHandler}></Input>
    </View>
  );
};

export { ValidationInput };
