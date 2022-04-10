import { TextStyle, ViewStyle } from 'react-native';
import { color } from '../../../theme';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  marginHorizontal: 0,
};

const CARD_TITLE_TEXT: TextStyle = {
  textAlign: 'left',
};

export const styles = {
  ROOT,
  CONTAINER,
  CARD_TITLE_TEXT,
};
