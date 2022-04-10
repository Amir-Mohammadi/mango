import { Dimensions, ImageStyle, ViewStyle } from 'react-native';
import { namedSpacing } from '../../../theme';

const screeHeight = Math.ceil(Dimensions.get('window').height);

const SWITCH_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.small,
  marginBottom: screeHeight < 700 ? namedSpacing.large : namedSpacing.massive,
};

const SWITCH_CONTROL_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  marginHorizontal: namedSpacing.small,
  justifyContent: 'space-around',
  marginBottom: screeHeight < 700 ? namedSpacing.small : namedSpacing.medium,
};

const SWITCH_AVATAR_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  flexDirection: 'row',
  marginBottom: screeHeight < 700 ? 80 : 130,
};

const BUTTON_AVATAR_CONTAINER: ViewStyle = {
  borderWidth: 1.5,
  borderColor: '#707070',
};

const SWITCH_SETTING_CONTAINER: ViewStyle = {
  marginBottom: screeHeight < 700 ? namedSpacing.large : namedSpacing.huge,
  flexDirection: 'row',
  marginHorizontal: namedSpacing.small,
  justifyContent: 'space-between',
};

const IMAGE: ImageStyle = {
  width: 250,
  height: 250,
  resizeMode: 'cover',
};
export const styles = {
  SWITCH_CONTAINER,
  SWITCH_CONTROL_CONTAINER,
  SWITCH_AVATAR_CONTAINER,
  SWITCH_SETTING_CONTAINER,
  BUTTON_AVATAR_CONTAINER,
  IMAGE,
};
