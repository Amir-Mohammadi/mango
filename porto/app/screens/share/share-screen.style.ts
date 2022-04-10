import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const ASSET_CONTAINER: ViewStyle = {
  paddingHorizontal: namedSpacing.small,
  paddingVertical: namedSpacing.small,
};

const PHONE_NUMBER_CONTAINER: ViewStyle = {
  paddingHorizontal: namedSpacing.small,
  paddingVertical: namedSpacing.small,
};

const ASSET_PICKER: ViewStyle = {
  height: 50,
  width: '100%',
};

const ERROR_TEXT: TextStyle = {
  fontSize: 16,
  paddingBottom: namedSpacing.small,
};

const BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: namedSpacing.huge,
};

const BUTTON: ViewStyle = {
  width: '40%',
  marginHorizontal: namedSpacing.medium,
};

export const styles = {
  ROOT,
  ASSET_CONTAINER,
  PHONE_NUMBER_CONTAINER,
  BUTTON_CONTAINER,
  BUTTON,
  ASSET_PICKER,

  ERROR_TEXT,
};
