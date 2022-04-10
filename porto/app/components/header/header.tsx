import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { namedSpacing } from '../../theme';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';
import { HeaderProps } from './header.props';

// static styles
const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: namedSpacing.medium,
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 56,
};
const TITLE: TextStyle = { textAlign: 'center' };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    style,
    titleStyle,
    leftIconStyle,
    rightIconStyle,
  } = props;
  const header = headerText || '';

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <Button variant="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} style={leftIconStyle} />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {rightIcon ? (
        <Button variant="link" onPress={onRightPress}>
          <Icon icon={rightIcon} style={rightIconStyle} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  );
}
