import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingVertical: namedSpacing.medium,
  paddingHorizontal: namedSpacing.small,
};

const ERROR_MESSAGE: TextStyle = {
  fontSize: 17,
  paddingVertical: namedSpacing.smaller,
};
export const styles = {
  ROOT,
  ERROR_MESSAGE,
};
