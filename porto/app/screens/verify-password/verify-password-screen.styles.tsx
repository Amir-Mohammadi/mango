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
const CARD_DIVIDER: ViewStyle = { width: 128, alignSelf: 'center' };

const CARD_IMAGE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
};
const UP_INPUT_TEXT_CONTAINER: ViewStyle = {
  marginTop: spacing[3],
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
};
const CELL: any = {
  width: 46,
  height: 49,
  lineHeight: 28,
  fontSize: 24,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#5EB4FC',
  textAlign: 'center',
  marginHorizontal: spacing[2],
  padding: spacing[2],
};
const FOCUS_CELL: any = {
  borderColor: '#000',
};

const EXPIRED_CODE_INPUT: ViewStyle = { borderColor: '#979797' };

const BUTTON: ViewStyle = {
  borderRadius: 8,
  marginTop: 0,
  paddingVertical: 0,
  height: 46,
};
const BUTTON_TITLE: TextStyle = {
  fontSize: 20,
  margin: 0,
  marginTop: 2, // FIXME dirty code, need to find the actual cause of test not being centered vertically
  textAlignVertical: 'center',
  textAlign: 'center',
  fontFamily: 'IRANSans',
  paddingVertical: 0,
};
const CODE_FIELD: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
};

const COUNTER_TEXT_CONTAINER: ViewStyle = {
  marginTop: spacing[2],
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
};

const COUNTER_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: 'IRANSans',
  color: '#8A9EAD',
  textAlign: 'center',
};

const CARD_IMAGE: ImageStyle = {
  flex: 1,
  height: 182,
  width: 164,
  resizeMode: 'center',
};

const UP_INPUT_TEXT: TextStyle = {
  fontSize: 19,
  fontFamily: 'IRANSans',
  paddingBottom: spacing[3],
};

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: 281 };

export const styles = {
  IMAGE_BACKGROUND,
  CONTAINER,
  CARD_CONTAINER,
  CARD_TITLE,
  CARD_DIVIDER,
  CARD_IMAGE,
  COUNTER_TEXT,
  CARD_IMAGE_CONTAINER,
  UP_INPUT_TEXT_CONTAINER,
  CELL,
  CODE_FIELD,
  FOCUS_CELL,
  EXPIRED_CODE_INPUT,
  BUTTON,
  BUTTON_TITLE,
  COUNTER_TEXT_CONTAINER,
  UP_INPUT_TEXT,
};

export const styles2 = {
  IMAGE_BACKGROUND,
  CONTAINER,
  CARD_CONTAINER,
  CARD_TITLE,
  CARD_DIVIDER,
  CARD_IMAGE,
  COUNTER_TEXT,
  CARD_IMAGE_CONTAINER,
  UP_INPUT_TEXT_CONTAINER,
  CELL,
  CODE_FIELD,
  FOCUS_CELL,
  EXPIRED_CODE_INPUT,
  BUTTON,
  BUTTON_TITLE,
  COUNTER_TEXT_CONTAINER,
  UP_INPUT_TEXT,
};
