import { ViewStyle } from 'react-native';

const HEADER_CONTAINER: ViewStyle = {
  width: '100%',
  height: 52,
};

const HEADER_CONST: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  alignItems: 'center',
};

const HEADER_LEFT_VAR: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const HEADER_MIDDLE_VAR: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const HEADER_RIGHT_VAR: ViewStyle = {
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export const styles = {
  HEADER_RIGHT_VAR,
  HEADER_MIDDLE_VAR,
  HEADER_LEFT_VAR,
  HEADER_CONST,
  HEADER_CONTAINER,
};
