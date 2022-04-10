import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing, spacing } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};
const ASSET_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: namedSpacing.small,
  paddingVertical: namedSpacing.small,
  backgroundColor: color.palette.white,
};

const ASSET_PICKER: TextStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
};

const FAB: TextStyle = {
  height: 50,
  width: '25%',
};

const ROOM_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: namedSpacing.small,
  marginVertical: namedSpacing.medium,
};

const ROOM_PICKER: ViewStyle = {
  height: 50,
  width: '100%',
};

const LIST_CONTAINER: ViewStyle = {
  marginVertical: namedSpacing.mediumPlus,
  paddingHorizontal: namedSpacing.large,
};

////////////////////////////////////////////////////////////////
const CONTAINER: ViewStyle = { flex: 1 };

const HEADER_RIGHT: ImageStyle = {
  width: 24,
  height: 27,
  marginRight: spacing[2],
};

const HEADER_LEFT: ImageStyle = {
  width: 24,
  height: 27,
  marginLeft: spacing[2],
  marginTop: spacing[8],
};

const HEADER_MIDDLE: ImageStyle = {
  width: 114,
  height: 31,
  marginLeft: spacing[2],
  marginTop: spacing[8],
};

const IMAGE_BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};

const IMAGE_BACKGROUND_IMAGE: ImageStyle = {
  height: 280,
};

export const styles = {
  ROOT,
  ASSET_CONTAINER,
  ASSET_PICKER,
  FAB,
  ROOM_CONTAINER,
  ROOM_PICKER,
  LIST_CONTAINER,
  ////////////////////////
  IMAGE_BACKGROUND_IMAGE,
  IMAGE_BACKGROUND_CONTAINER,
  CONTAINER,
  HEADER_RIGHT,
  HEADER_LEFT,
  HEADER_MIDDLE,
};
