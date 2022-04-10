import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: '100%' };

const HEADER_RIGHT: ImageStyle = {
  width: 24,
  height: 27,
  marginRight: spacing[2],
};

const HEADER_LEFT: ImageStyle = {
  width: 24,
  height: 27,
  marginLeft: spacing[2],
};

const HEADER_MIDDLE: ImageStyle = {
  width: 114,
  height: 31,
  marginLeft: spacing[2],
};

const ZONE: TextStyle = {
  alignSelf: 'center',
  color: '#FFF8F8',
  fontSize: 27,
  fontWeight: 'bold',
};

const HOME: TextStyle = {
  alignSelf: 'center',
  color: '#FFF8F8',
  fontSize: 13,
  fontWeight: 'bold',
};

const DEVICES_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingTop: spacing[5],
};
export const styles = {
  CONTAINER,
  HEADER_RIGHT,
  HEADER_LEFT,
  HEADER_MIDDLE,
  IMAGE_BACKGROUND,
  ZONE,
  HOME,
  DEVICES_CONTAINER,
};
