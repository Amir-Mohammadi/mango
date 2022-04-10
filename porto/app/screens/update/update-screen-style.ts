import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const ICON_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const UPDATE_TEXT: TextStyle = {
  paddingVertical: namedSpacing.medium,
  fontSize: 20,
};

export const styles = {
  ROOT,
  ICON_CONTAINER,
  UPDATE_TEXT,
};
