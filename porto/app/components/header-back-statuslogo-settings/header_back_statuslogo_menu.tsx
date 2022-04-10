import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useStores } from '../../stores';
import { headerBackStatusLogoSettingsProps } from './header_back_statuslogo_settings.props';

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function HeaderBackStatusLogoSettings(
  props: headerBackStatusLogoSettingsProps,
) {
  const { deviceStore } = useStores();
  const { onBackPress, onLogoPress, onSettingsPress } = props;
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
        return require('../../assets/images/logo-offline.png');
    }
  };
  return (
    <View
      style={{
        height: 65,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          padding: 20,
        }}
        onPress={props.onBackPress}>
        <Image
          source={require('../../assets/images/back.png')}
          style={{
            width: 13,
            height: 22,
            flex: 1,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={props.onLogoPress}>
        <Image
          source={logoSelector(deviceStore.connectionStatus)}
          style={{ height: 49, width: 88, flex: 1 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={props.onSettingsPress}>
        <Image
          source={require('../../assets/images/setting-white.png')}
          style={{
            height: 25,
            width: 27,
            alignSelf: 'flex-end',
            flex: 1,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
