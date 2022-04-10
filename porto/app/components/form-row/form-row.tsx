import * as React from 'react';
import { View } from 'react-native';
import { FormRowProps } from './form-row.props';
import { variants } from './form-row.variants';

/**
 * A horizontal container component used to hold a row of a form.
 */
export function FormRow(props: FormRowProps) {
  const viewStyle = [variants[props.variant], props.style];

  return <View style={viewStyle}>{props.children}</View>;
}
