import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const DEVICE_ITEM: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  paddingVertical: namedSpacing.small,
  marginRight: namedSpacing.large,
  paddingHorizontal: namedSpacing.medium,
  backgroundColor: color.palette.offWhite,
  width: '45%',
  height: 120,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: color.palette.lighterGrey,
  elevation: 2,
  opacity: 3,
};

const IMAGE_CONTAINER: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  marginTop: namedSpacing.tiny,
};

const IMAGE: ImageStyle = {
  width: 50,
  height: 50,
};

const TITLE_CONTAINER: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  marginLeft: namedSpacing.small,
  marginBottom: namedSpacing.mediumPlus,
  flexDirection: 'row',
};

const TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
  color: color.palette.black,
};

const ROOM: TextStyle = {
  fontSize: 15,
  fontWeight: '300',
  color: color.palette.black,
};

const STATUS: TextStyle = {
  fontSize: 15,
  fontWeight: '300',
  color: color.palette.orangeDarker,
};

const DESCRIPTION_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 0,
  left: 0,
  marginLeft: namedSpacing.small,
  marginBottom: namedSpacing.tiny,
};

export const styles = {
  DEVICE_ITEM,
  IMAGE,
  IMAGE_CONTAINER,
  TITLE_CONTAINER,
  TITLE,
  ROOM,
  STATUS,
  DESCRIPTION_CONTAINER,
};
