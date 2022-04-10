import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = { flex: 1 };

const LOGO_CONTAINER: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
};

const LOGO: ImageStyle = { height: 56, width: 203, alignSelf: 'center' };

const CARD_CONTAINER: ViewStyle = {
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
  height: '80%',
};

const CARD_TITLE: TextStyle = {
  fontFamily: 'IRANSans',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#373737',
};

const IMAGE_BACKGROUND: ViewStyle = { flex: 1, height: '35%' };

const CARD_DIVIDER: ViewStyle = { width: 130, alignSelf: 'center' };

const TEXT: TextStyle = {
  alignSelf: 'center',
  textAlign: 'center',
  fontFamily: 'IRANSans',
  fontSize: 14,
  marginVertical: spacing[5],
};

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 20,
};

const BUTTON: ViewStyle = {
  borderRadius: 8,
  backgroundColor: '#FC5E5E',
};

const BUTTON_TITLE: TextStyle = {
  fontSize: 14,
  fontFamily: 'IRANSans',
  paddingTop: spacing[1],
};

export const styles = {
  CONTAINER,
  LOGO_CONTAINER,
  LOGO,
  CARD_CONTAINER,
  CARD_TITLE,
  IMAGE_BACKGROUND,
  CARD_DIVIDER,
  TEXT,
  BUTTON,
  BUTTON_TITLE,
  BUTTON_CONTAINER,
};
