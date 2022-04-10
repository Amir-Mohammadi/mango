import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };
const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[6] + spacing[5],
  marginBottom: spacing[5],
  marginHorizontal: spacing[5],
  padding: spacing[4],
  elevation: 10,
  borderRadius: 10,
  backgroundColor: 'white',
};
const CARD_TITLE: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 25,
  textAlign: 'center',
  color: '#373737',
};

const IMAGE_BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};

const IMAGE_BACKGROUND_IMAGE: ImageStyle = {
  height: 280,
};

const CARD_DIVIDER: ViewStyle = { width: 128, alignSelf: 'center' };
const CARD_IMAGE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
  marginBottom: spacing[2],
};

const CARD_IMAGE: ImageStyle = {
  flex: 1,
  height: 182,
  width: 164,
  resizeMode: 'center',
};

const SCREEN: ViewStyle = {
  flexGrow: 1,
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
const INPUT_CONTAINER: ViewStyle = {
  borderBottomWidth: 0,
};
const INPUT: TextStyle = {
  height: 42,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#5EB4FC',
  fontSize: 20,
  justifyContent: 'center',
  textAlign: 'right',
  paddingRight: 5,
  paddingVertical: 5,
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
const TERMS_OF_SERVICE: TextStyle = {
  alignSelf: 'center',
  color: '#8A9EAD',
  fontSize: 12,
};
const LINK: TextStyle = {
  color: '#5DB1FD',
  textDecorationLine: 'underline',
  fontSize: 12,
};

const DISPLAY_NONE: ViewStyle = { display: 'none' };
export const styles = {
  CONTAINER,
  CARD_CONTAINER,
  CARD_TITLE,
  IMAGE_BACKGROUND_CONTAINER,
  CARD_DIVIDER,
  CARD_IMAGE_CONTAINER,
  CARD_IMAGE,
  UP_INPUT_TEXT_CONTAINER,
  UP_INPUT_TEXT,
  BUTTON,
  BUTTON_CONTAINER,
  BUTTON_TITLE,
  INPUT,
  LINK,
  INPUT_CONTAINER,
  TERMS_OF_SERVICE,
  DISPLAY_NONE,
  IMAGE_BACKGROUND_IMAGE,
  SCREEN,
};
