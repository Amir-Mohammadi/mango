import { TextStyle, ViewStyle } from 'react-native';
import { color } from '../../theme';

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

const CARD_LIST_ITEM_SUBTITLE: TextStyle = {
  paddingTop: 10,
};
export const styles = {
  ROOT,
  CONTAINER,
  CARD_TITLE_TEXT,
  CARD_LIST_ITEM_SUBTITLE,
};
