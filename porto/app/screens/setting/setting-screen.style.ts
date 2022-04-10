import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { color, namedSpacing, spacing } from '../../theme';

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
const CARD_CONTENT: ViewStyle = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
};

const CARD_TOUCHABILITY: ViewStyle = {
  flex: 1,
  padding: spacing[2],
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
};

const SMALL_CARD_IMAGE: ImageStyle = {
  height: 18.31,
  width: 21.13,
  resizeMode: 'contain',
};

const LOGO: ImageStyle = {
  width: 203,
  height: 54,
  alignSelf: 'center',
  marginTop: spacing[4],
};
const HEADER_RIGHT_COMPONENT_IMAGE: ImageStyle = {
  marginTop: spacing[8],
  width: 27,
  height: 24,
  marginRight: spacing[2],
};

const HEADER_LEFT_COMPONENT_IMAGE: ImageStyle = {
  marginTop: spacing[8],
  width: 11,
  height: 22,
  marginLeft: spacing[2],
};

const CARDS_CONTAINER: ViewStyle = { paddingBottom: spacing[4] };
const SCROLL_VIEW: ViewStyle = { maxHeight: 390, paddingBottom: spacing[8] };

const SMALL_CARD_RIGHT_CONTENT_CONTAINER: ImageStyle = {
  flexDirection: 'row-reverse',
};
const SMALL_CARD_TEXT: TextStyle = {
  justifyContent: 'center',
  marginRight: spacing[2],
  fontSize: 12,
  fontFamily: 'IRANSans',
};
const SWITCH_CONTAINER: ViewStyle = { marginRight: spacing[8] + spacing[8] };

const LANGUAGE_CONTAINER: ViewStyle = { flexDirection: 'row-reverse' };

const LANGUAGE: TextStyle = {
  fontSize: 13,
  color: '#969696',
  marginLeft: spacing[2],
};

const NAVIGATE_BUTTON: any = {
  height: 18.31,
  width: 21.13,
  resizeMode: 'contain',
};

const BUTTON: any = { borderRadius: 8 };

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 15,
  marginBottom: 0,
  padding: spacing[2],
};

const BUTTON_TITLE: TextStyle = {
  fontSize: 20,
  fontFamily: 'IRANSans',
};

const CONTAINER: ViewStyle = { flex: 1 };

const IMAGE_BACKGROUND: ImageStyle = { flex: 1, height: '35%' };

const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[6],
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
  paddingHorizontal: 0,
};

const SMALL_CARD: ViewStyle = {
  elevation: 30,
  shadowColor: '#00000040',
  borderWidth: 1,
  borderColor: 'white',
  backgroundColor: 'white',
  borderRadius: 10,
  height: 49,
  marginHorizontal: 20,
  marginVertical: 0,
  paddingTop: 5,
};

const X: ViewStyle = { padding: 10 };
export const styles = {
  X,
  CONTAINER,
  SMALL_CARD,
  CARD_CONTAINER,
  IMAGE_BACKGROUND,
  ROOT,
  LIST_ITEM_CONTAINER,
  LIST_ITEM,
  AVATAR_VIEW,
  AVATAR_CONTAINER,
  LOGOUT,
  CARD_CONTENT,
  SMALL_CARD_IMAGE,
  LOGO,
  HEADER_RIGHT_COMPONENT_IMAGE,
  HEADER_LEFT_COMPONENT_IMAGE,
  SCROLL_VIEW,
  SMALL_CARD_RIGHT_CONTENT_CONTAINER,
  SMALL_CARD_TEXT,
  SWITCH_CONTAINER,
  LANGUAGE_CONTAINER,
  LANGUAGE,
  NAVIGATE_BUTTON,
  BUTTON,
  BUTTON_CONTAINER,
  BUTTON_TITLE,
  CARDS_CONTAINER,
  CARD_TOUCHABILITY,
};
