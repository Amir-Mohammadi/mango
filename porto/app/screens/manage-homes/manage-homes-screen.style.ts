import { ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const ASSETS: ViewStyle = {
  marginVertical: namedSpacing.mediumPlus,
  paddingHorizontal: namedSpacing.large,
};

export const styles = {
  ROOT,
  ASSETS,
};
