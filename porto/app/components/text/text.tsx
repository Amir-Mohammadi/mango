import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';
import { TextProps } from './text.props';
import { variants } from './text.variants';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const Text: React.FC<TextProps> = props => {
  // grab the props
  const {
    variant = 'default',
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const content = text || children;

  const variantStyle = variants[variant];
  const styles = [variantStyle, styleOverride];

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
};
