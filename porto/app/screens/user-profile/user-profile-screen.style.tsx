import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };

const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[8] + spacing[7],
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
};

const CARD_TITLE_NAME: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 27,
  textAlign: 'center',
  color: '#373737',
  marginTop: spacing[8],
  marginBottom: 0,
};

const CARD_TITLE_NUMBER: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 18,
  textAlign: 'center',
  color: '#588BF9',
};

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: '35%' };

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
  backgroundColor: '#EFEBEB',
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

const VERSION: TextStyle = {
  fontSize: 13,
  alignSelf: 'center',
  marginTop: spacing[2],
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

const QR_CODE: ImageStyle = {
  width: 64.34,
  height: 64.34,
  backgroundColor: 'white',
  alignSelf: 'center',
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

const QR_CODE_BORDER: ViewStyle = {
  width: 74.34,
  height: 74.34,
  alignSelf: 'center',
  marginTop: spacing[5],
  paddingTop: spacing[1],
};

const AVATAR_BORDER: ViewStyle = {
  width: 135,
  height: 135,
  elevation: 30,
  borderRadius: 135 / 2,
  alignSelf: 'center',
  position: 'absolute',
  top: 40,
  justifyContent: 'center',
  alignItems: 'center',
};
export const styles = {
  ROOT,
  CONTAINER,
  HEADER_RIGHT,
  HEADER_LEFT,
  HEADER_MIDDLE,
  CARD_CONTAINER,
  CARD_TITLE_NAME,
  CARD_TITLE_NUMBER,
  IMAGE_BACKGROUND,
  CARD_DIVIDER,
  AVATAR_CONTAINER,
  SMALL_CARD,
  SMALL_CARD_IMAGE,
  VERSION,
  SMALL_CARD_TEXT,
  SMALL_CARD_CONTENT,
  QR_CODE,
  HEADER,
  RIGHT_ICON,
  SMALL_CARD_RIGHT_CONTENT,
  SMALL_CARD_ARROW,
  QR_CODE_BORDER,
  AVATAR_BORDER,
};
