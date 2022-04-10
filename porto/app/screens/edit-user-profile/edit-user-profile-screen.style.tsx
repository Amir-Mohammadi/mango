import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };

const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[8] + spacing[7],
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
  backgroundColor: 'white',
};

const CARD_TITLE_NAME: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 27,
  textAlign: 'center',
  color: '#373737',
  marginBottom: 0,
  fontWeight: 'bold',
};

const CARD_TITLE_NUMBER: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 18,
  alignItems: 'center',
  marginBottom: 0,

  textAlign: 'center',
  color: '#588BF9',
};

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: 281 };

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
const CARD_DIVIDER: ViewStyle = { width: 128, alignSelf: 'center' };

const AVATAR_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
  width: 125,
  height: 125,
};

const AVATAR_EDIT_BUTTON_CONTAINER: ViewStyle = {
  width: 130,
  height: 130,
  borderRadius: 135 / 2,
  alignSelf: 'center',
  position: 'absolute',
  top: 100,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 11,
};

const AVATAR_EDIT_BUTTON: ImageStyle = {
  width: 18,
  height: 18,
  // resizeMode: 'contain',
};

const CARD_TITLE_NAME_CONTAINER: ViewStyle = {
  flexDirection: 'row-reverse',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: spacing[3],
  marginHorizontal: 0,
  paddingHorizontal: 0,
};

const CARD_TITLE_NUMBER_CONTAINER: ViewStyle = {
  flexDirection: 'row-reverse',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[4],
};

const EDIT_BUTTON_CONTAINER: ViewStyle = {
  alignSelf: 'center',
  marginRight: 10,
};

const EDIT_BUTTON: ImageStyle = {
  height: 16,
  width: 16,
  resizeMode: 'contain',
  alignSelf: 'center',
};
const SMALL_CARD: ViewStyle = {
  elevation: 30,
  shadowColor: '#00000040',
  borderWidth: 0,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  height: 57,
};

const SMALL_CARD_IMAGE: ImageStyle = {
  height: 18.31,
  width: 21.13,
  resizeMode: 'contain',
  marginTop: spacing[1],
};

const ROOT: ViewStyle = {
  flex: 1,
};

const SMALL_CARD_CONTENT: ViewStyle = {
  marginTop: 5,
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
};

const SMALL_CARD_TEXT: TextStyle = {
  justifyContent: 'center',
  marginRight: spacing[2],
  fontSize: 14,
  fontFamily: 'IRANSans',
};

const HEADER: ViewStyle = { backgroundColor: 'transparent', marginTop: 50 };

const RIGHT_ICON: ImageStyle = {
  height: 20,
  width: 20,
};

const SMALL_CARD_RIGHT_CONTENT: ImageStyle = { flexDirection: 'row-reverse' };

const SMALL_CARD_ARROW: ImageStyle = {
  height: 18.31,
  width: 21.13,
  resizeMode: 'contain',
};

const AVATAR_BORDER: ViewStyle = {
  width: 135,
  height: 135,
  borderRadius: 135 / 2,
  alignSelf: 'center',
  position: 'absolute',
  top: 100,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
};

const LOG_OUT_CONTAINER: ViewStyle = {
  backgroundColor: '#FC5E5E',
  borderRadius: 8,
};

const LOG_OUT_TITLE: TextStyle = { fontFamily: 'IRANSans', fontSize: 14 };

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  height: '100%',
  justifyContent: 'flex-end',
};

const BLUR_PART: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const CARD_TITLE_NAME_SCROLL: ViewStyle = { maxHeight: 50 };

export const styles = {
  CARD_TITLE_NAME_SCROLL,
  ROOT,
  CONTAINER,
  HEADER_RIGHT,
  HEADER_LEFT,
  HEADER_MIDDLE,
  CARD_CONTAINER,
  CARD_TITLE_NAME,
  CARD_TITLE_NUMBER,
  CARD_TITLE_NUMBER_CONTAINER,
  IMAGE_BACKGROUND,
  CARD_DIVIDER,
  AVATAR_CONTAINER,
  AVATAR_EDIT_BUTTON_CONTAINER,
  AVATAR_EDIT_BUTTON,
  EDIT_BUTTON_CONTAINER,
  EDIT_BUTTON,
  SMALL_CARD,
  SMALL_CARD_IMAGE,
  SMALL_CARD_TEXT,
  SMALL_CARD_CONTENT,
  HEADER,
  RIGHT_ICON,
  SMALL_CARD_RIGHT_CONTENT,
  SMALL_CARD_ARROW,
  AVATAR_BORDER,
  CARD_TITLE_NAME_CONTAINER,
  LOG_OUT_CONTAINER,
  LOG_OUT_TITLE,
  MODAL_CONTAINER,
  BLUR_PART,
};
