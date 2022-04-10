import React from 'react';
import { Image, TextStyle, View, ViewStyle } from 'react-native';
import { useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { HeaderProps } from './header_logo.props';

// static styles
const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: namedSpacing.medium,
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 56,
};
const TITLE: TextStyle = { textAlign: 'center' };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function HeaderLogo(props: HeaderProps) {
  const { deviceStore } = useStores();

  const { onLogoPress } = props;
  const logoSelector = (connectionStatus: number | undefined) => {
    switch (connectionStatus) {
      case 2:
        return require('../../assets/images/logo-online.png');
      case 1:
        return require('../../assets/images/logo-offline.png');
      case 0:
        return require('../../assets/images/logo-offline.png');
      case 3:
        return require('../../assets/images/logo-offline.png');
      default:
        return '';
    }
  };

  return (
    <View
      style={{
        height: 65,
        alignItems: 'center',
      }}>
      <Image
        source={logoSelector(deviceStore.connectionStatus)}
        style={{ height: 49, width: 88 }}
        resizeMode="cover"
      />
    </View>
  );
}
