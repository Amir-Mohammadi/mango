import { TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../../theme/spacing';

const CONTAINER: ViewStyle = {
  width: '100%',
  height: 225,
  paddingHorizontal: spacing[5],
  marginVertical: spacing[7],
  backgroundColor: 'transparent',
};
const CARD: ViewStyle = {
  marginTop: spacing[4],
  paddingVertical: spacing[3],
  borderRadius: 10,
  elevation: 8,
  backgroundColor: 'white',
};

const TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#373737',
};

const DIVIDER: ViewStyle = { width: 130, alignSelf: 'center' };

const FIRST_BUTTON: ViewStyle = { marginTop: spacing[3] };

const BUTTON_TEXT: TextStyle = { textAlign: 'center', fontSize: 16 };

const NOT_FIRST_BUTTON: ViewStyle = { marginTop: 5 };

const DELETE_IMAGE_TEXT: TextStyle = {
  textAlign: 'center',
  color: 'red',
  fontSize: 16,
};
export const styles = {
  CONTAINER,
  CARD,
  TITLE,
  DIVIDER,
  FIRST_BUTTON,
  BUTTON_TEXT,
  NOT_FIRST_BUTTON,
  DELETE_IMAGE_TEXT,
};
