import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const PROGRESS_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: namedSpacing.large,
  marginBottom: namedSpacing.massive,
};

const PROGRESS: ViewStyle = {
  marginTop: namedSpacing.mediumPlus,
};

const PROGRESS_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
};

export const styles = {
  ROOT,
  PROGRESS_CONTAINER,
  PROGRESS,
  PROGRESS_TEXT,
};
