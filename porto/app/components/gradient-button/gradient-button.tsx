import React from 'react';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { GradientButtonProps } from './gradient-button.props';
import { textVariants, viewVariants } from './gradient-button.variants';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const GradientButton: React.FC<GradientButtonProps> = props => {
  // grab the props
  const {
    variant = 'main',
    text,
    colors,
    start,
    end,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewVariantStyle = viewVariants[variant];
  const viewStyle = [viewVariantStyle, styleOverride];

  const textVariantStyle = textVariants[variant];
  const textStyle = [textVariantStyle, textStyleOverride];

  const gradientColors = colors ?? ['#567DF8', '#5EBCFD'];
  const startCoordinates = start || { x: 0, y: 0 };
  const endCoordinates = end || { x: 1, y: 0 };

  return (
    <Button
      linearGradientProps={{
        colors: gradientColors,
        start: startCoordinates,
        end: endCoordinates,
        pointerEvents: 'none',
      }}
      ViewComponent={LinearGradient}
      title={text}
      titleStyle={textStyle}
      buttonStyle={[
        { borderRadius: 5 },
        { width: '100%', height: 48 },
        viewStyle,
      ]}
      {...rest}></Button>
    // <LinearGradient

    // </LinearGradient>
  );
};
