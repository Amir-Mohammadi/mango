import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const LIST_ITEM_CONTAINER: ViewStyle = {
  paddingVertical: namedSpacing.small,
  paddingHorizontal: namedSpacing.small,
};

const LIST_ITEM: ViewStyle = {};

const AVATAR_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: namedSpacing.medium,
  paddingVertical: namedSpacing.medium,
};

const AVATAR_CONTAINER: ViewStyle = {
  width: 130,
  height: 130,
};

const LOGOUT: TextStyle = {
  color: '#FF0000',
};

export const styles = {
  ROOT,
  LIST_ITEM_CONTAINER,
  LIST_ITEM,
  AVATAR_VIEW,
  AVATAR_CONTAINER,
  LOGOUT,
};
