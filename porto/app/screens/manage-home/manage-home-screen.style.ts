import { ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const LIST_CONTAINER: ViewStyle = {
  marginVertical: namedSpacing.mediumPlus,
  paddingHorizontal: namedSpacing.large,
};

const BUTTON_CONTAINER: ViewStyle = {
  flex: 1,
  paddingHorizontal: namedSpacing.small,
  paddingVertical: namedSpacing.massive,
  height: '50%',
  justifyContent: 'flex-end',
};

const BUTTON: ViewStyle = {
  backgroundColor: 'red',
};

export const styles = {
  ROOT,
  LIST_CONTAINER,
  BUTTON_CONTAINER,
  BUTTON,
};
