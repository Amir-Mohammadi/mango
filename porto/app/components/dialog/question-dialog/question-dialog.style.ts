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
};

const DIALOG_BODY_CONTAINER: ViewStyle = {
  marginHorizontal: namedSpacing.medium,
  marginVertical: namedSpacing.tiny,
};

const DIALOG_FOTTER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginHorizontal: namedSpacing.tiny,
  marginTop: namedSpacing.medium,
  paddingBottom: namedSpacing.smaller,
};

const DIALOG_HEADER_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '700',
};

const DIALOG_BODY_TEXT: TextStyle = {
  fontSize: 15,
  fontWeight: '200',
};

const DIALOG_FOTTER_BUTTON: ViewStyle = {
  width: '25%',
  paddingHorizontal: namedSpacing.tiny,
  marginTop: namedSpacing.medium,
};

export const styles = {
  DIALOG_CONTAINER,
  DIALOG_HEADER_CONTAINER,
  DIALOG_BODY_CONTAINER,
  DIALOG_FOTTER_CONTAINER,
  DIALOG_HEADER_TEXT,
  DIALOG_BODY_TEXT,
  DIALOG_FOTTER_BUTTON,
};
