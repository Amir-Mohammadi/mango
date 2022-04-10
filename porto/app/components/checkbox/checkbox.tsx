import * as React from 'react';
import { TextStyle, TouchableOpacity, View } from 'react-native';
import { namedSpacing } from '../../theme';
import { Text } from '../text/text';
import { CheckboxProps } from './checkbox.props';
import {
  fillVariants,
  outlineVariants,
  rootVariants,
} from './checkbox.variants';

const LABEL: TextStyle = { paddingLeft: namedSpacing.smaller };

export const Checkbox: React.FC<CheckboxProps> = props => {
  const { variant = 'default' } = props;

  const numberOfLines = props.multiline ? 0 : 1;

  const rootVariantStyle = rootVariants[variant];
  const rootStyle = [rootVariantStyle, props.style];

  const outlineVariantStyle = outlineVariants[variant];
  const outlineStyle = [outlineVariantStyle, props.outlineStyle];

  const fillVariantStyle = fillVariants[variant];
  const fillStyle = [fillVariantStyle, props.fillStyle];

  const onPress = props.onToggle
    ? () => props.onToggle && props.onToggle(!props.value)
    : undefined;

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}>
      <View style={outlineStyle}>
        {props.value && <View style={fillStyle} />}
      </View>
      <Text text={props.text} numberOfLines={numberOfLines} style={LABEL} />
    </TouchableOpacity>
  );
};
