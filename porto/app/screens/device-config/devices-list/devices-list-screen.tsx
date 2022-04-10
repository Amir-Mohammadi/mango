import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading, Screen } from '../../../components';
import { HeaderBackLogoMenu } from '../../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../../components/space/space';
import { Text } from '../../../components/text/text';
import { goBack, NavigatorParamList } from '../../../navigators';
import { DeviceConfigNavigatorParamList } from '../../../navigators/device-config-navigator';
import { useReduxDispatch } from '../../../redux-store/core/root-store';
import { toggleDrawer } from '../../../redux-store/drawer-store';
import { useStores } from '../../../stores';
import { spacing } from '../../../theme';
import { useOnMount } from '../../../utils/hooks/use-on-mount';
import { getWifiPermissionIfNeeded } from '../../../utils/wifi/get-wifi-permission.android';
import { DeviceListItem } from './components/device-list-item';
import { styles } from './devices-list-screen.style';

type SelectDeviceModelScreenProps = CompositeScreenProps<
  StackScreenProps<DeviceConfigNavigatorParamList, 'devicesListScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const DevicesListScreen: React.FC<SelectDeviceModelScreenProps> =
  observer(props => {
    const dispatch = useReduxDispatch();
    const { navigation } = props;
    const { deviceProfileStore, deviceConfigStore } = useStores();

    useOnMount(() => {
      deviceConfigStore.resetStoreState();
      deviceProfileStore.getDevicesProfile();
    });

    const onPressDeviceProfileHandler = async (modelId: number) => {
      const res = await getWifiPermissionIfNeeded();
      if (!res) return;
      navigation.navigate('espTouchStack', {
        screen: 'preConfig',
      });
    };

    if (
      deviceProfileStore.isLoading &&
      // only when there is nothing to show to user
      deviceProfileStore.deviceProfiles.length === 0
    ) {
      return (
        <Screen style={styles.ROOT} variant="fixed">
          <Loading size={80} />
        </Screen>
      );
    } else {
      return (
        <View>
          <StatusBar translucent backgroundColor="transparent" />
          <ImageBackground
            source={require('../../../assets/images/Background-full.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ flex: 1 }}>
              <HeaderBackLogoMenu
                onMenuPress={() => {
                  dispatch(toggleDrawer());
                }}
                onBackPress={goBack}
                onLogoPress={() => navigation.navigate('home')}
              />
              <View
                style={{
                  marginHorizontal: spacing[4],
                  marginTop: spacing[5],
                  marginBottom: spacing[8],
                  height: '80%',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  paddingHorizontal: spacing[4],
                  paddingTop: spacing[4],
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {'افزودن دستگاه'}
                </Text>
                <Space />
                <Divider
                  style={{ width: '40%', alignSelf: 'center' }}
                  width={2}
                  color={'#5A97FB'}
                />
                <Space />
                <Space />
                <ScrollView style={{ marginBottom: spacing[3] }}>
                  {deviceProfileStore.deviceProfiles.map(profile => {
                    return (
                      <DeviceListItem
                        key={profile.id}
                        upText={profile.profileName}
                        downText="GENERAL"
                        image={require('../../../assets/images/Socket.png')}
                        onPress={() => onPressDeviceProfileHandler(profile.id)}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>
      );
    }
  });
