import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../text/text';
import { ButtonProps } from './button.props';
import { textVariants, viewVariants } from './button.variants';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
const Button: React.FC<ButtonProps> = props => {
  // grab the props
  const {
    variant = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewVariantStyle = viewVariants[variant];
  const viewStyle = [viewVariantStyle, styleOverride];

  const textVariantStyle = textVariants[variant];
  const textStyle = [textVariantStyle, textStyleOverride];

  const content = children || <Text text={text} style={textStyle} />;

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
};

export { Button };
