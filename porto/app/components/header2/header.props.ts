import { StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  /**
   * header non-i18n
   */
  headerText?: string;

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void;

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void;

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>;

  headerLeftComponent?: JSX.Element;

  headerRightComponent?: JSX.Element;

  headerMiddleComponent?: JSX.Element;
}
