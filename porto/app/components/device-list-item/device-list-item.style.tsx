import { TextStyle, ViewStyle } from 'react-native';
import { namedSpacing, spacing } from '../../theme';

const DEVICE_ITEM: ViewStyle = {
  backgroundColor: 'transparent',
  flexDirection: 'column',
  paddingHorizontal: namedSpacing.medium,
  flex: 1,
  height: 120,
  borderRadius: 10,
};

const ON_LINEARGRADIENT: ViewStyle = {
  borderRadius: 25,
  flex: 1,
  width: '45%',
  margin: 8,
  borderWidth: 1,
  borderColor: 'transparent',
};

const OFF_LINEARGRADIENT: ViewStyle = {
  borderRadius: 25,
  flex: 1,
  width: '45%',
  margin: 8,
  borderWidth: 1,
  borderColor: '#C4D4E4',
};

const CARD: ViewStyle = {
  flex: 1,
  flexDirection: 'row-reverse',
  paddingVertical: spacing[5],
};

const CARD_RIGHT_SIDE: ViewStyle = {
  flex: 1,
  alignItems: 'flex-end',
};

const ON_DEVICE_NAME: TextStyle = {
  color: 'white',
  fontSize: 20,
  flex: 1,
};

const OFF_DEVICE_NAME: TextStyle = {
  color: '#6990BA',
  fontSize: 20,
  flex: 1,
};

const ON_DEVICE_ZONE_TICKER: TextStyle = { color: 'white', fontSize: 20 };

const OFF_DEVICE_ZONE_TICKER: TextStyle = { color: '#6990BA', fontSize: 20 };

const ON_DEVICE_ZONE: TextStyle = { color: 'white', fontSize: 12 };

const OFF_DEVICE_ZONE: TextStyle = { color: '#6990BA', fontSize: 12 };

const CARD_LEFT_SIDE: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: 50,
};

const ON_DEVICE_STATUS: TextStyle = {
  fontSize: 11,
  color: 'white',
  marginLeft: spacing[3],
  fontFamily: 'IRANSans',
  textAlign: 'center',
};

const OFF_DEVICE_STATUS: TextStyle = {
  fontSize: 10,
  color: '#6990BA',
  marginLeft: spacing[2],
};
export const styles = {
  OFF_DEVICE_STATUS,
  ON_DEVICE_STATUS,
  CARD_LEFT_SIDE,
  ON_DEVICE_ZONE_TICKER,
  OFF_DEVICE_ZONE_TICKER,
  OFF_DEVICE_NAME,
  ON_DEVICE_NAME,
  DEVICE_ITEM,
  ON_DEVICE_ZONE,
  OFF_DEVICE_ZONE,
  CARD,
  CARD_RIGHT_SIDE,
  ON_LINEARGRADIENT,
  OFF_LINEARGRADIENT,
};
