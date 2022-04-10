import { TextStyle, ViewStyle } from 'react-native';
import { namedSpacing } from '../../../theme';

const DIALOG_CONTAINER: ViewStyle = {
  borderWidth: 0.4,
  borderRadius: 2,
  elevation: 10,
  width: '90%',
};

const DIALOG_HEADER_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.medium,
  marginVertical: namedSpacing.small,
  justifyContent: 'center',
  flexDirection: 'row',
};

const DIALOG_BODY_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.medium,
  marginVertical: namedSpacing.tiny,
};

const DIALOG_FOOTER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginHorizontal: namedSpacing.tiny,
  marginTop: namedSpacing.medium,
  paddingBottom: namedSpacing.medium,
};

const DIALOG_HEADER_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '700',
};

const DIALOG_BODY_TEXT: TextStyle = {
  fontSize: 15,
  fontWeight: '200',
  paddingTop: namedSpacing.small,
};

const DIALOG_FOOTER_BUTTON: ViewStyle = {
  width: '30%',
  paddingHorizontal: namedSpacing.tiny,
};

const DIALOG_INPUT_ERROR_TEXT: TextStyle = {
  fontSize: 16,
};

export const styles = {
  DIALOG_CONTAINER,
  DIALOG_HEADER_CONTAINER,
  DIALOG_BODY_CONTAINER,
  DIALOG_FOOTER_CONTAINER,
  DIALOG_HEADER_TEXT,
  DIALOG_BODY_TEXT,
  DIALOG_FOOTER_BUTTON,
  DIALOG_INPUT_ERROR_TEXT,
};
