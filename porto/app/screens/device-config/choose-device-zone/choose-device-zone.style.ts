import { TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
};

const CONFIG_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: namedSpacing.massive,
};

const CONFIG_IMAGE: ViewStyle = {
  borderWidth: 1,
  borderColor: color.palette.lighterGrey,
};

const CONFIG_STEP_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: namedSpacing.massive,
  marginHorizontal: namedSpacing.mediumPlus,
};

const CONFIG_STEP_LOADING: ViewStyle = {
  marginRight: namedSpacing.small,
};

const CONFIG_STEP_DESCRIPTION: ViewStyle = {};
const CONFIG_STEP_TEXT: TextStyle = {
  color: '#707070',
  fontSize: 16,
};

const CONFIG_RESULT_TEXT: TextStyle = {
  color: '#707070',
  fontSize: 20,
  fontWeight: '700',
};

const CONFIG_RESULT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: namedSpacing.medium,
};

const BUTTON_CONTAINER: ViewStyle = {
  margin: 20,
};

const BUTTON: ViewStyle = {
  height: 48,
};

const TEXT: TextStyle = { alignSelf: 'center', fontSize: 24 };

export const styles = {
  ROOT,
  CONFIG_IMAGE_CONTAINER: CONFIG_IMAGE_CONTAINER,
  CONFIG_IMAGE: CONFIG_IMAGE,
  CONFIG_STEP_CONTAINER,
  CONFIG_STEP_Loading: CONFIG_STEP_LOADING,
  CONFIG_STEP_DESCRIPTION,
  CONFIG_STEP_TEXT,
  CONFIG_RESULT_TEXT,
  CONFIG_RESULT_CONTAINER,
  BUTTON_CONTAINER,
  BUTTON,
  TEXT,
};

