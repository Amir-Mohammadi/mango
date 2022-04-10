import React, { ReactElement } from 'react';
import {
    ControllerProps as ReactHookControllerProps,
    FieldPath,
    FieldValues
} from 'react-hook-form';
import { Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { InputProps as ElementsInputProps } from 'react-native-elements';
import { InputWithController } from '../input-with-controll/input-wtih-control';
import { styles } from './phone-number-Input.styles';

type ControllerProps<
  TFieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ReactHookControllerProps<TFieldValues, TName>, 'render'>;

type InputProps = Omit<
  ElementsInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'onChange'
>;

type PhoneNumberInputProps<
  TFieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  inputProps?: InputProps;
  controllerProps: ControllerProps<TFieldValues, TName>;
};

export const PhoneNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: PhoneNumberInputProps<TFieldValues, TName>,
): ReactElement<any, any> | null => {
  return (
    <View style={styles.CONTAINER}>
      <View style={styles.FLAG_CODE_CONTAINER}>
        <CountryFlag
          isoCode="IR"
          size={20}
          style={styles.FLAG_CODE_COMPONENT_CONTAINER}
        />

        <Text style={styles.CODE}> +98</Text>
      </View>
      <View style={styles.INPUT_CONTAINER}>
        <InputWithController
          inputProps={{
            containerStyle: styles.INPUT_BOX,
            inputContainerStyle: styles.VALIDATION_INPUT_CONTAINER,
            inputStyle: styles.INPUT,
            renderErrorMessage: false,
            keyboardType: 'phone-pad',
            placeholder: 'شماره موبایل',
            ...props.inputProps,
          }}
          controllerProps={props.controllerProps}
        />
      </View>
    </View>
  );
};
