import React from 'react';
import { TextInput, View } from 'react-native';
import { color } from '../../theme';
import { Text } from '../text/text';
import { TextFieldProps } from './text-field.props';
import { containerVariants, inputVariants } from './text-field.variants';

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    variant = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props;

  const containerStyles = [containerVariants[variant], styleOverride];
  const inputStyles = [inputVariants[variant], inputStyleOverride];
  const actualPlaceholder = placeholder;

  return (
    <View style={containerStyles}>
      <Text variant="fieldLabel" text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      />
    </View>
  );
}
