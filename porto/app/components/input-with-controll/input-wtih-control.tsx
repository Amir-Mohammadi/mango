import React, { ReactElement } from 'react';
import {
    Controller,
    ControllerProps as ReactHookControllerProps,
    FieldPath,
    FieldValues
} from 'react-hook-form';
import { Input, InputProps as ElementsInputProps } from 'react-native-elements';

type ControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ReactHookControllerProps<TFieldValues, TName>, 'render'>;

type InputProps = Omit<
  ElementsInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'onChange'
>;

type InputWithControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  inputProps?: InputProps;
  controllerProps: ControllerProps<TFieldValues, TName>;
};

export const InputWithController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: InputWithControllerProps<TFieldValues, TName>,
): ReactElement<any, any> | null => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...props.inputProps}
        />
      )}
      {...props.controllerProps}
    />
  );
};
