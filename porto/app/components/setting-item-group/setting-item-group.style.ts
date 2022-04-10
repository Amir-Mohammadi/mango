import { TextStyle, ViewStyle } from 'react-native';
import { namedSpacing } from '../../theme';

const CARD_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.tiny,
  marginTop: namedSpacing.small,
};

const CARD_HEADER_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: '400',
  color: '#707070',
};

const CARD_HEADER_CONTAINER: ViewStyle = {
  paddingHorizontal: namedSpacing.small,
  marginTop: namedSpacing.tiny,
};

const CARD_BODY_CONTAINER: ViewStyle = {
  marginTop: namedSpacing.small,
};

const CARD_FOOTER_CONTAINER: ViewStyle = {
  paddingHorizontal: namedSpacing.medium,
  marginTop: namedSpacing.tiny,
};

export const styles = {
  CARD_CONTAINER,
  CARD_HEADER_TEXT,
  CARD_HEADER_CONTAINER,
  CARD_BODY_CONTAINER,
  CARD_FOOTER_CONTAINER,
};
