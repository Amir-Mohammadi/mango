import { ViewStyle } from 'react-native';
import { color, spacing } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const LIST_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  marginHorizontal: spacing[4],
  marginTop: spacing[6],
};

export const styles = {
  ROOT,
  LIST_CONTAINER,
};
