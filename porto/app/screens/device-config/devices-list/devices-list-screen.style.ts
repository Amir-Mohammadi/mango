import { ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const LIST_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.tiny,
};

export const styles = {
  ROOT,
  LIST_CONTAINER,
};
