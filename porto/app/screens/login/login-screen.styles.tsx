import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };
const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[6] + spacing[5],
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
};
const CARD_TITLE: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 25,
  textAlign: 'center',
  color: '#373737',
};

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: '35%' };

const CARD_DIVIDER: ViewStyle = { width: 128, alignSelf: 'center' };
const CARD_IMAGE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
};

const CARD_IMAGE: ImageStyle = {
  flex: 1,
  height: 182,
  width: 164,
  resizeMode: 'center',
};

const UP_INPUT_TEXT_CONTAINER: ViewStyle = {
  marginTop: spacing[3],
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
};

const UP_INPUT_TEXT: TextStyle = {
  fontSize: 14,
  fontFamily: 'IRANSans',
  paddingBottom: spacing[3],
};

const BUTTON: ViewStyle = {
  borderRadius: 8,
};

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 20,
};

const BUTTON_TITLE: TextStyle = {
  fontSize: 20,
  fontFamily: 'IRANSans',
  paddingTop: spacing[1],
};

const DISABLED_BUTTON: TextStyle = { color: 'white', fontSize: 20 };
export const styles = {
  CONTAINER,
  CARD_CONTAINER,
  CARD_TITLE,
  IMAGE_BACKGROUND,
  CARD_DIVIDER,
  CARD_IMAGE_CONTAINER,
  CARD_IMAGE,
  UP_INPUT_TEXT_CONTAINER,
  UP_INPUT_TEXT,
  BUTTON,
  BUTTON_CONTAINER,
  BUTTON_TITLE,
  DISABLED_BUTTON,
};

export const styles2 = {
  CONTAINER,
  CARD_CONTAINER,
  CARD_TITLE,
  IMAGE_BACKGROUND,
  CARD_DIVIDER,
  CARD_IMAGE_CONTAINER,
  CARD_IMAGE,
  UP_INPUT_TEXT_CONTAINER,
  UP_INPUT_TEXT,
  BUTTON,
  BUTTON_CONTAINER,
  BUTTON_TITLE,
  DISABLED_BUTTON,
};
