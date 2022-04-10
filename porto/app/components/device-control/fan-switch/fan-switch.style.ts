import { Dimensions, ImageStyle, ViewStyle } from 'react-native';
import { namedSpacing, spacing } from '../../../theme';

const screeHeight = Math.ceil(Dimensions.get('window').height);

const CONTAINER: ViewStyle = {
  marginHorizontal: spacing[3],
};

const SWITCHER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  marginHorizontal: namedSpacing.small,
  justifyContent: 'space-around',
  marginBottom: screeHeight < 700 ? namedSpacing.small : namedSpacing.medium,
};

const FAN_STATUS_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  flexDirection: 'row',
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
  CONTAINER,
  SWITCHER_CONTAINER,
  FAN_STATUS_CONTAINER,
  SWITCH_SETTING_CONTAINER,
  BUTTON_AVATAR_CONTAINER,
  IMAGE,
};
