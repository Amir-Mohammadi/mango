import { TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../theme';

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  height: 42,
};

const FLAG_CODE_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  width: 63,
  borderColor: '#5EB4FC',
  borderWidth: 1,
  borderBottomLeftRadius: 8,
  borderTopLeftRadius: 8,
  borderRightWidth: 0,
};

const FLAG_CODE_COMPONENT_CONTAINER = {
  marginVertical: 9,
  marginLeft: 3,
};

const INPUT_CONTAINER: ViewStyle = {
  flex: 3.5,
  marginHorizontal: 0,
};

const VALIDATION_INPUT_CONTAINER: ViewStyle = {
  borderBottomWidth: 0,
};

const CODE: TextStyle = {
  fontSize: 10,
  marginTop: spacing[3],
  marginLeft: spacing[1],
};

const INPUT: TextStyle = {
  height: 42,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
  borderWidth: 1,
  borderColor: '#5EB4FC',
  fontSize: 20,
  justifyContent: 'center',
  textAlign: 'center',
};

const INPUT_BOX: ViewStyle = { margin: 0, paddingHorizontal: 0 };

export const styles = {
  CONTAINER,
  FLAG_CODE_CONTAINER,
  CODE,
  INPUT_CONTAINER,
  VALIDATION_INPUT_CONTAINER,
  FLAG_CODE_COMPONENT_CONTAINER,
  INPUT,
  INPUT_BOX,
};
