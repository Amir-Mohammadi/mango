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
  marginTop: spacing[2],
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[3],
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

const UNDERLINE: ViewStyle = { width: 95, alignSelf: 'center' };

const INPUT: TextStyle = {
  marginTop: spacing[5],
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#5992FA',
  fontSize: 20,
  justifyContent: 'center',
  textAlign: 'left',
};

const INPUT_CONTAINER: ViewStyle = {
  borderBottomWidth: 0,
  alignSelf: 'center',
};

const BUTTON_TEXT: TextStyle = { paddingVertical: spacing[2] };
export const styles = {
  CONTAINER,
  CARD,
  TITLE,
  UNDERLINE,
  INPUT,
  INPUT_CONTAINER,
  BUTTON_TEXT,
};
