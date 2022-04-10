import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useReducer, useState } from 'react';
import { Button } from 'react-native-elements';
import { Header, Screen } from '../../components';
import {
    ValidationInput,
    ValidationType
} from '../../components/validation-input/validation-input';
import { NavigatorParamList } from '../../navigators';
import { styles } from './validation-template-screen.style';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
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

export const ValidationTemplateScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'validationTemplate'>
> = observer(props => {
  const [formValidationDisplay, setFormValidationDisplay] =
    useState<boolean>(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      phone: '',
      email: '',
    },
    validates: {
      phone: { isValid: false, validationMessage: '' },
      email: { isValid: false, validationMessage: '' },
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity, validationMessage) => {
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
    return !input.isValid && formValidationDisplay && input.validationMessage;
  };
  const onSubmitHandler = () => {
    if (!formState.formIsValid) {
      setFormValidationDisplay(true);
    }
  };
  return (
    <Fragment>
      <Header
        headerText="Validate"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="fixed">
        <ValidationInput
          identifier="phone"
          label="phone"
          onInputChange={inputChangeHandler}
          maxLength={11}
          validationTypes={[ValidationType.required, ValidationType.phone]}
          errorMessage={validationMessage(formState.validates.phone)}
          errorStyle={styles.ERROR_MESSAGE}></ValidationInput>

        <ValidationInput
          identifier="email"
          label="Eamil"
          onInputChange={inputChangeHandler}
          validationTypes={[ValidationType.required, ValidationType.email]}
          errorMessage={validationMessage(formState.validates.email)}
          errorStyle={styles.ERROR_MESSAGE}></ValidationInput>

        <Button title={'submit'} onPress={onSubmitHandler}></Button>
      </Screen>
    </Fragment>
  );
});
