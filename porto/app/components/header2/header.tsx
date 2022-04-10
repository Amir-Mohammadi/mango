import React from 'react';
import { View } from 'react-native';
import { styles } from './header-style';
import { HeaderProps } from './header.props';
/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const { onLeftPress, onRightPress } = props;

  return (
    <View style={[styles.HEADER_CONTAINER, props.style]}>
      <View style={[styles.HEADER_CONST, styles.HEADER_LEFT_VAR]}>
        {props.headerLeftComponent}
      </View>

      <View style={[styles.HEADER_CONST, styles.HEADER_MIDDLE_VAR]}>
        {props.headerMiddleComponent}
      </View>
      <View style={[styles.HEADER_CONST, styles.HEADER_RIGHT_VAR]}>
        {props.headerRightComponent}
      </View>
    </View>
  );
}
