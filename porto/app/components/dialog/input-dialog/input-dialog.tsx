import React, { useCallback, useReducer, useState } from 'react';
import { View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import { ValidationInput } from '../../validation-input/validation-input';
import { InputDialogProps } from './input-dialog.props';
import { styles } from './input-dialog.style';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state: State, action: Action): State => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.values,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.validates,
      [action.input]: {
        isValid: action.isValid,
        validationMessage: action.validationMessage,
      },
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key].isValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      validates: updatedValidities,
      values: updatedValues,
    };
  }

  return state;
};

export const InputDialog: React.FC<InputDialogProps> = props => {
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      input: '',
    },
    validates: {
      input: { isValid: false, validationMessage: '' },
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (
      inputIdentifier: string,
      inputValue: string,
      inputValidity: boolean,
      validationMessage: string,
    ) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        validationMessage: validationMessage,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const validationMessage = (input: any): string => {
    return !input.isValid && isErrorVisible && input.validationMessage;
  };
  return (
    <View>
      <Overlay
        overlayStyle={styles.DIALOG_CONTAINER}
        isVisible={props.isVisible}
        onBackdropPress={props.onDismiss}>
        {props.title !== '' && (
          <View style={styles.DIALOG_HEADER_CONTAINER}>
            <Text style={styles.DIALOG_HEADER_TEXT}>{props.title}</Text>
          </View>
        )}
        <View style={styles.DIALOG_BODY_CONTAINER}>
          <ValidationInput
            keyboardType={props.keyboardType}
            identifier="input"
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            initialValue={props.initialValue}
            onInputChange={inputChangeHandler}
            validationTypes={props.validationType ?? []}
            errorMessage={validationMessage(formState.validates.input)}
            errorStyle={styles.DIALOG_INPUT_ERROR_TEXT}
          />
          {props.message !== '' && (
            <Text style={styles.DIALOG_BODY_TEXT}>{props.message}</Text>
          )}
        </View>
        <View style={styles.DIALOG_FOOTER_CONTAINER}>
          <View style={styles.DIALOG_FOOTER_BUTTON}>
            <Button
              title={'Cancel'}
              type={'outline'}
              onPress={props.onCancel}
            />
          </View>
          <View style={styles.DIALOG_FOOTER_BUTTON}>
            <Button
              title={'Ok'}
              type={'outline'}
              onPress={() => {
                if (formState.formIsValid) {
                  return props.onSubmit
                    ? props.onSubmit(formState.values.input)
                    : null;
                } else {
                  setIsErrorVisible(true);
                }
              }}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};
interface State {
  values: {
    input: string;
  };
  validates: {
    input: {
      isValid: boolean;
      validationMessage: string;
    };
  };
  formIsValid: boolean;
}

interface Action {
  input: string;
  type: any;
  validationMessage: string;
  isValid: boolean;
  value: string;
}
