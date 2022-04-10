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

const LIST_ITEM_TEXT: TextStyle = {
  color: color.palette.angry,
};

export const styles = {
  ROOT,
  CONTAINER,
  LIST_ITEM_TEXT,
};
